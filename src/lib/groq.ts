import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const SYSTEM_PROMPT = `Eres un asistente virtual profesional de FALPAT. Responde de forma clara, amable y concisa en español.
Si no sabes algo, di la verdad. No inventes información.`;

export async function getAIResponse(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[] = []
): Promise<string> {
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
