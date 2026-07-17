import Groq from "groq-sdk";
import { db } from "./firebase";

let _groq: Groq | null = null;

function getGroq(): Groq {
  if (!_groq) {
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _groq;
}

interface BotConfig {
  business?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
    instagram?: string;
  };
  knowledge?: {
    products?: { name: string; description: string }[];
    services?: string[];
    faq?: { q: string; a: string }[];
    customInstructions?: string;
  };
}

let configCache: BotConfig | null = null;
let configCacheTime = 0;

async function getConfig(): Promise<BotConfig> {
  const now = Date.now();
  if (configCache && now - configCacheTime < 60000) {
    return configCache;
  }

  try {
    const doc = await db.collection("config").doc("bot").get();
    configCache = doc.exists ? (doc.data() as BotConfig) : {};
    configCacheTime = now;
  } catch {
    configCache = configCache || {};
  }

  return configCache!;
}

export async function buildSystemPrompt(): Promise<string> {
  const config = await getConfig();
  const biz = config.business || {};
  const kb = config.knowledge || {};

  const lines: string[] = [];

  if (kb.customInstructions) {
    lines.push(kb.customInstructions);
    lines.push("");
  }

  if (biz.name) {
    lines.push("## INFORMACIÓN DE LA EMPRESA");
    lines.push(`- Nombre: ${biz.name}`);
    if (biz.address) lines.push(`- Ubicación: ${biz.address}`);
    if (biz.phone) lines.push(`- Teléfono: ${biz.phone}`);
    if (biz.website) lines.push(`- Sitio web: ${biz.website}`);
    if (biz.instagram) lines.push(`- Instagram: ${biz.instagram}`);
    lines.push("");
  }

  if (kb.products && kb.products.length > 0) {
    lines.push("## PRODUCTOS");
    kb.products.forEach((p, i) => {
      lines.push(`${i + 1}. **${p.name}**: ${p.description}`);
    });
    lines.push("");
  }

  if (kb.services && kb.services.length > 0) {
    lines.push("## SERVICIOS");
    kb.services.forEach((s, i) => {
      lines.push(`${i + 1}. ${s}`);
    });
    lines.push("");
  }

  if (kb.faq && kb.faq.length > 0) {
    lines.push("## PREGUNTAS FRECUENTES");
    kb.faq.forEach((f) => {
      lines.push(`- **${f.q}**: ${f.a}`);
    });
    lines.push("");
  }

  lines.push("## REGLAS");
  lines.push("- Respondé SIEMPRE en español, amable y conciso.");
  lines.push("- Nunca inventes precios ni información que no esté en esta lista.");
  lines.push("- Si no sabés algo, decí que un representante lo contactará.");
  if (biz.phone) {
    lines.push(`- Si el cliente pide hablar con una persona, derivalo al WhatsApp: ${biz.phone}.`);
  }

  return lines.join("\n");
}

export async function getAIResponse(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[] = []
): Promise<string> {
  try {
    const systemPrompt = await buildSystemPrompt();

    const completion = await getGroq().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.slice(-10),
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    return completion.choices[0]?.message?.content || "No pude generar una respuesta.";
  } catch (error) {
    console.error("Error en Groq:", error);
    const config = await getConfig();
    const phone = config.business?.phone || "nuestro número";
    return `Hubo un error al procesar tu mensaje. Intentá de nuevo o contactanos al ${phone}.`;
  }
}
