import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { incrementReads, incrementWrites } from "@/lib/monitor";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const statusFilter = url.searchParams.get("status");
  const dateFrom = url.searchParams.get("from");
  const dateTo = url.searchParams.get("to");

  const snapshot = await db.collection("pendingCalls").get();
  await incrementReads(1);

  const allCalls = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let calls = allCalls;

  if (statusFilter && statusFilter !== "all") {
    calls = calls.filter((c: any) => c.status === statusFilter);
  }

  if (dateFrom) {
    calls = calls.filter(
      (c: any) => c.createdAt && c.createdAt >= dateFrom
    );
  }
  if (dateTo) {
    const toEnd = dateTo + "T23:59:59.999Z";
    calls = calls.filter(
      (c: any) => c.createdAt && c.createdAt <= toEnd
    );
  }

  const stats = {
    total: allCalls.length,
    pending: allCalls.filter((c: any) => c.status === "pending").length,
    called: allCalls.filter((c: any) => c.status === "called").length,
    discarded: allCalls.filter((c: any) => c.status === "discarded").length,
  };

  return NextResponse.json({ calls, stats });
}

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 403 });
  }

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }

  const validStatuses = ["pending", "called", "discarded"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await db.collection("pendingCalls").doc(id).set(
    {
      status,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
  await incrementWrites(1);

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 403 });
  }

  const body = await request.json();
  const { action, status: statusFilter } = body;

  if (action === "export-csv") {
    let query = db.collection("pendingCalls").orderBy("createdAt", "desc");
    if (statusFilter && statusFilter !== "all") {
      query = query.where("status", "==", statusFilter);
    }

    const snapshot = await query.get();
    await incrementReads(1);

    const rows = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        telefono: d.phone || doc.id,
        primer_mensaje: d.firstMessage || "",
        fecha_primer_mensaje: d.firstMessageAt
          ? new Date(d.firstMessageAt).toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
            })
          : "",
        ultimo_mensaje: d.lastMessage || "",
        fecha_ultimo_mensaje: d.lastMessageAt
          ? new Date(d.lastMessageAt).toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
            })
          : "",
        cantidad_mensajes: d.messageCount || 0,
        resumen_ia: d.aiSummary || "",
        estado: d.status === "pending" ? "PENDIENTE" : d.status === "called" ? "LLAMADO" : "DESCARTADO",
      };
    });

    const header = Object.keys(rows[0] || {}).join(",");
    const csvRows = rows.map((r) =>
      Object.values(r)
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header, ...csvRows].join("\n");

    return NextResponse.json({ csv, count: rows.length });
  }

  if (action === "seed") {
    const convSnapshot = await db.collection("conversations").get();
    await incrementReads(1);

    let seeded = 0;
    const batch = db.batch();

    for (const doc of convSnapshot.docs) {
      const data = doc.data();
      const phone = data.phone || doc.id;
      const messages = data.messages || [];

      const hasOutOfHours = messages.some(
        (m: any) =>
          m.role === "assistant" &&
          typeof m.content === "string" &&
          m.content.includes("fuera de nuestro horario")
      );

      if (!hasOutOfHours) continue;

      const existing = await db.collection("pendingCalls").doc(phone).get();
      if (existing.exists) continue;

      const firstUserMsg = messages.find((m: any) => m.role === "user");
      const lastAssistantMsg = [...messages]
        .reverse()
        .find((m: any) => m.role === "assistant");

      const firstMsgAt = data.lastMessage
        ? new Date(
            Date.now() - (messages.length / 2) * 60000 * 30
          ).toISOString()
        : new Date().toISOString();

      batch.set(db.collection("pendingCalls").doc(phone), {
        phone,
        firstMessage: firstUserMsg?.content || "",
        firstMessageAt: firstMsgAt,
        lastMessage: firstUserMsg?.content || "",
        lastMessageAt: data.lastMessage || new Date().toISOString(),
        messageCount: messages.filter((m: any) => m.role === "user").length,
        messages: messages
          .filter((m: any) => m.role === "user")
          .map((m: any, i: number) => ({
            text: m.content,
            at: new Date(
              Date.now() - (messages.length / 2 - i) * 60000 * 30
            ).toISOString(),
          })),
        aiSummary: lastAssistantMsg?.content?.split("\n")[0] || "",
        status: "pending",
        createdAt: firstMsgAt,
        updatedAt: data.lastMessage || new Date().toISOString(),
      });

      seeded++;
    }

    if (seeded > 0) {
      await batch.commit();
      await incrementWrites(seeded);
    }

    return NextResponse.json({ ok: true, seeded });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
