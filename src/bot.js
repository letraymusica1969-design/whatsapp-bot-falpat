const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const Groq = require("groq-sdk");
const { client, isClientReady, sendMessage } = require("./whatsapp");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Firebase
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "FIREBASE", "whatsapp-bot-falpat-firebase-adminsdk-fbsvc-069357f943.json"),
    "utf-8"
  )
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Eres un asistente virtual profesional de FALPAT. Responde de forma clara, amable y concisa en español.
Si no sabes algo, di la verdad. No inventes información.`;

const LIMITS = { reads: 50000, writes: 20000 };

function isWithinBusinessHours() {
  const now = new Date();
  const argTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  const hour = argTime.getHours();
  const day = argTime.getDay();

  if (day === 0) return true;
  if (day === 6) return hour >= 14;
  return hour >= 17 || hour < 8;
}

async function getAIResponse(userMessage, history) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.slice(-10),
        { role: "user", content: userMessage },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });
    return completion.choices[0]?.message?.content || "No pude generar una respuesta.";
  } catch (error) {
    console.error("Error en Groq:", error);
    return "Hubo un error al procesar tu mensaje. Intenta de nuevo.";
  }
}

async function getTodayStats() {
  const today = new Date().toISOString().split("T")[0];
  const statsRef = db.collection("stats").doc(today);
  const doc = await statsRef.get();
  if (doc.exists) return doc.data();
  const initial = { date: today, reads: 0, writes: 0, messagesProcessed: 0, uniqueUsers: [] };
  await statsRef.set(initial);
  return initial;
}

async function checkLimits() {
  const stats = await getTodayStats();
  const pct = stats.writes / LIMITS.writes;
  if (pct >= 0.9) return "critical";
  if (pct >= 0.7) return "warning";
  return "ok";
}

// Manejar mensajes entrantes
client.on("message", async (msg) => {
  try {
    if (msg.fromMe) return;
    if (!isWithinBusinessHours()) {
      await sendMessage(
        msg.from.replace("@c.us", ""),
        "Nuestro horario de atención es de lunes a viernes de 8:00 a 17:00 hs. Los sábados hasta las 14:00 hs. ¡Te responderemos cuando estemos disponibles!"
      );
      return;
    }

    const limitsStatus = await checkLimits();
    if (limitsStatus === "critical") {
      console.log("Límite crítico alcanzado");
      return;
    }

    const phone = msg.from.replace("@c.us", "");
    const userMessage = msg.body.trim();

    const conversationRef = db.collection("conversations").doc(phone);
    const conversationDoc = await conversationRef.get();
    await db.collection("stats").doc(new Date().toISOString().split("T")[0]).update({ reads: require("firebase-admin/firestore").FieldValue.increment(1) });

    const history = conversationDoc.exists ? conversationDoc.data()?.messages || [] : [];
    const aiResponse = await getAIResponse(userMessage, history);

    await sendMessage(phone, aiResponse);

    const newHistory = [
      ...history,
      { role: "user", content: userMessage },
      { role: "assistant", content: aiResponse },
    ].slice(-20);

    await conversationRef.set({
      phone,
      messages: newHistory,
      lastMessage: new Date().toISOString(),
      messageCount: newHistory.length,
    }, { merge: true });

    await db.collection("stats").doc(new Date().toISOString().split("T")[0]).update({
      writes: require("firebase-admin/firestore").FieldValue.increment(1),
      messagesProcessed: require("firebase-admin/firestore").FieldValue.increment(1),
    });

    console.log(`[${phone}] User: ${userMessage}`);
    console.log(`[${phone}] Bot: ${aiResponse}`);
  } catch (error) {
    console.error("Error procesando mensaje:", error);
  }
});

// API para ver stats
app.get("/api/stats", async (req, res) => {
  const key = req.query.key;
  if (key !== process.env.MONITOR_SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const stats = await getTodayStats();
  const status = await checkLimits();
  res.json({ status, ...stats });
});

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", whatsapp: isClientReady() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

client.initialize();
