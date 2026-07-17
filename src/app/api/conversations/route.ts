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

    const snapshot = await db.collection("conversations").get();
    const conversations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    conversations.sort((a: any, b: any) => {
      const dateA = new Date(a.lastMessage || 0).getTime();
      const dateB = new Date(b.lastMessage || 0).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({ conversations });
  } catch (error: any) {
    console.error("Error fetching conversations:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}
