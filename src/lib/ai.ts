import Groq from "groq-sdk";
import { db } from "./firebase";
import { getLearned } from "./learn";

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
    responseStyle?: "breve" | "normal" | "detallado";
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

  const learned = await getLearned();
  if (learned.length > 0) {
    lines.push("## CONVERSACIONES ANTERIORES (lo que ya le respondimos a clientes)");
    learned.slice(0, 10).forEach((l) => {
      lines.push(`- Cliente: "${l.q}" → Bot: "${l.a}"`);
    });
    lines.push("");
  }

  const style = kb.responseStyle || "breve";

  lines.push("## REGLAS");
  lines.push("- Respondé SIEMPRE en español, de forma cálida y natural, como un amigo que atiende el WhatsApp de la empresa.");
  if (style === "detallado") {
    lines.push("- Podés dar respuestas completas y detalladas cuando el cliente lo requiera.");
  } else if (style === "normal") {
    lines.push("- Respuestas claras y directas, sin relleno ni detalles innecesarios.");
  } else {
    lines.push("- Respuestas MUY CORTAS: máximo 1-2 líneas. Para saludos o charla simple, alcanza con una sola línea.");
    lines.push("- No desarrolles ni entres en detalle salvo que el cliente lo pida expresamente.");
    lines.push("- Si el cliente quiere más detalle, ofrecé profundizar recién al final, como última opción (ej: \"¿Querés que te cuente más?\").");
  }
  lines.push("- Sé creativo y variado: nunca repitas textualmente una respuesta anterior ni uses siempre la misma plantilla; variá las palabras, la estructura y el tono.");
  lines.push("- Si el cliente vuelve a preguntar algo parecido, respondé con otras palabras y sumá un dato nuevo o un matiz distinto.");
  lines.push("- Hablá cercano (tratá de 'vos'), sin formalismos ni frases de relleno tipo 'Que tengas un excelente día'.");
  lines.push("- Cuando corresponda, cerrá con una pregunta corta para seguir la conversación.");
  lines.push("- Nunca inventes precios ni información que no esté en esta lista.");
  lines.push("- No menciones 'representante' ni ofrezcas derivar a una persona: atendé vos la consulta con lo que sabés.");
  lines.push("- Usá CONVERSACIONES ANTERIORES como referencia de datos y estilo, pero reescribí la respuesta con tus palabras para no sonar repetido.");
  if (biz.phone) {
    lines.push(`- SOLO si el cliente pide explícitamente hablar con una persona, pasale el WhatsApp de ventas: ${biz.phone}.`);
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
      max_tokens: 300,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "No pude generar una respuesta.";
  } catch (error) {
    console.error("Error en Groq:", error);
    const config = await getConfig();
    const phone = config.business?.phone || "nuestro número";
    return `Hubo un error al procesar tu mensaje. Intentá de nuevo o contactanos al ${phone}.`;
  }
}
