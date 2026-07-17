import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getAIResponse } from "@/lib/ai";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { incrementReads, incrementWrites, incrementMessages, checkLimits } from "@/lib/monitor";
import type { WhatsAppWebhookBody } from "@/lib/types";

export const dynamic = "force-dynamic";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

function isWithinBusinessHours(): boolean {
  const now = new Date();
  const argTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  const hour = argTime.getHours();
  const day = argTime.getDay();

  if (day === 0) return true;
  if (day === 6) return hour >= 14;
  return hour >= 17 || hour < 8;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(request: Request) {
  try {
    const body: WhatsAppWebhookBody = await request.json();

    const messages = body.entry?.[0]?.changes?.[0]?.value?.messages;
    if (!messages?.length) {
      return NextResponse.json({ status: "ok" });
    }

    const limits = await checkLimits();
    if (limits.status === "critical") {
      console.error("LIMITE CRITICO ALCANZADO:", limits.alerts);
      return NextResponse.json({ status: "rate_limited" }, { status: 429 });
    }

    for (const msg of messages) {
      if (msg.type !== "text" || !msg.text?.body) continue;

      if (!isWithinBusinessHours()) {
        await sendWhatsAppMessage(
          msg.from,
          "Nuestro horario de atención es de lunes a viernes de 8:00 a 17:00 hs. Los sábados hasta las 14:00 hs. ¡Te responderemos cuando estemos disponibles!"
        );
        continue;
      }

      const phone = msg.from;
      const userMessage = msg.text.body.trim();

      const conversationRef = db.collection("conversations").doc(phone);
      const conversationDoc = await conversationRef.get();
      await incrementReads(1);

      const history = conversationDoc.exists
        ? conversationDoc.data()?.messages || []
        : [];

      const aiResponse = await getAIResponse(userMessage, history);

      const sent = await sendWhatsAppMessage(phone, aiResponse);

      const newHistory = [
        ...history,
        { role: "user", content: userMessage },
        { role: "assistant", content: aiResponse },
      ].slice(-20);

      await conversationRef.set(
        {
          phone,
          messages: newHistory,
          lastMessage: new Date().toISOString(),
          messageCount: newHistory.length,
        },
        { merge: true }
      );
      await incrementWrites(1);

      await incrementMessages(phone);

      console.log(`[${phone}] User: ${userMessage}`);
      console.log(`[${phone}] Bot: ${aiResponse}`);
      console.log(`[${phone}] Enviado: ${sent}`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
