import { NextResponse } from "next/server";
import { checkLimits, getTodayStats } from "@/lib/monitor";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (key !== process.env.MONITOR_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limits = await checkLimits();
  const stats = await getTodayStats();

  return NextResponse.json({
    status: limits.status,
    today: stats.date,
    usage: limits.details,
    alerts: limits.alerts,
    messagesProcessed: stats.messagesProcessed,
    uniqueUsers: stats.uniqueUsers?.length || 0,
    lastChecked: new Date().toISOString(),
  });
}
