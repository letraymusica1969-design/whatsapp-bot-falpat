import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (key !== process.env.MONITOR_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doc = await db.collection("config").doc("bot").get();
    const data = doc.exists ? doc.data() : getDefaultConfig();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching config:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (key !== process.env.MONITOR_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await db.collection("config").doc("bot").set(body, { merge: true });

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Error saving config:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}

function getDefaultConfig() {
  return {
    phone: {
      phoneNumberId: "1295937623597311",
      label: "Número de test",
    },
    business: {
      name: "Grupo FALPAT",
      phone: "+54 11-3197-2072",
      email: "info@grupofalpat.com",
      address: "Ruta 6 y 34 km 156, Luján, Buenos Aires",
      website: "https://hormigon.grupofalpat.com.ar",
      instagram: "@grupofalpat",
    },
    knowledge: {
      products: [
        {
          name: "Hormigón Proyectado",
          description: "Se aplica mediante proyección neumática o hidráulica. Ideal para construcción de piletas y revestimientos.",
        },
        {
          name: "Mortero RDC",
          description: "Material de relleno de densidad controlada. Proporciona soporte estructural.",
        },
        {
          name: "Fast Track",
          description: "Hormigón de rápida habilitación (12-24 horas). Ideal para aeropuertos, refuerzos de pavimentos, carreteras, calles urbanas, patios de maniobras y almacenamientos.",
        },
        {
          name: "Hormigón para Pavimentos",
          description: "Para carreteras, calles y aceras. Alta resistencia, durabilidad y textura.",
        },
        {
          name: "Bloques de Hormigón",
          description: "Solución constructiva económica y rápida. Medidas: 1.60 x 80 x 80. Peso: 2400 kg.",
        },
      ],
      services: [
        "Servicio post-venta",
        "Servicio de laboratorio",
        "Alquiler de Mixer",
        "Alquiler bombas pluma y arrastre",
        "Servicio de carga en planta",
      ],
      faq: [
        { q: "¿Tienen precios?", a: "Los precios dependen del tipo de hormigón, volumen y zona de entrega. Contactá a nuestro equipo al +54 11-3197-2072 para una cotización personalizada." },
        { q: "¿Hacen envíos?", a: "Sí, realizamos entregas en obra. La cobertura es Gran Buenos Aires y alrededores. Contactanos para confirmar disponibilidad en tu zona." },
        { q: "¿Cuál es el horario?", a: "Nuestro horario de atención es de lunes a viernes de 8:00 a 17:00 hs, sábados hasta 14:00 hs." },
        { q: "¿Dónde están ubicados?", a: "Estamos en Ruta 6 y 34 km 156, Luján, Buenos Aires." },
      ],
      customInstructions: "Sos el asistente virtual de Grupo FALPAT. Respondé de forma amable, profesional y concisa en español. Si no sabés algo, decí que un representante lo contactará a la brevedad.",
    },
    schedule: {
      timezone: "America/Argentina/Buenos_Aires",
      closedMessage: "Nuestro horario de atención es de lunes a viernes de 8:00 a 17:00 hs. Los sábados hasta las 14:00 hs. ¡Te responderemos cuando estemos disponibles!",
    },
  };
}
