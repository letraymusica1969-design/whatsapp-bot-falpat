import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { incrementReads, incrementWrites } from "@/lib/monitor";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 403 });
  }

  const statusFilter = url.searchParams.get("status");
  const dateFrom = url.searchParams.get("from");
  const dateTo = url.searchParams.get("to");

  let query = db.collection("pendingCalls").orderBy("createdAt", "desc");

  if (statusFilter && statusFilter !== "all") {
    query = query.where("status", "==", statusFilter);
  }

  const snapshot = await query.get();
  await incrementReads(1);

  let calls = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

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
    total: calls.length,
    pending: calls.filter((c: any) => c.status === "pending").length,
    called: calls.filter((c: any) => c.status === "called").length,
    discarded: calls.filter((c: any) => c.status === "discarded").length,
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

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
