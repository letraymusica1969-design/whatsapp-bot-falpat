import { db } from "./firebase";
import { FieldValue } from "firebase-admin/firestore";

interface DailyStats {
  date: string;
  reads: number;
  writes: number;
  deletes: number;
  messagesProcessed: number;
  uniqueUsers: string[];
  alerts: string[];
}

const LIMITS = {
  reads: 50000,
  writes: 20000,
  deletes: 20000,
};

const ALERT_THRESHOLDS = {
  warning: 0.7,
  critical: 0.9,
};

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export async function getTodayStats(): Promise<DailyStats> {
  const today = getTodayKey();
  const statsRef = db.collection("stats").doc(today);
  const doc = await statsRef.get();

  if (doc.exists) {
    return doc.data() as DailyStats;
  }

  const initial: DailyStats = {
    date: today,
    reads: 0,
    writes: 0,
    deletes: 0,
    messagesProcessed: 0,
    uniqueUsers: [],
    alerts: [],
  };

  await statsRef.set(initial);
  return initial;
}

export async function incrementReads(count: number = 1): Promise<void> {
  const today = getTodayKey();
  const statsRef = db.collection("stats").doc(today);

  await statsRef.update({
    reads: FieldValue.increment(count),
  });
}

export async function incrementWrites(count: number = 1): Promise<void> {
  const today = getTodayKey();
  const statsRef = db.collection("stats").doc(today);

  await statsRef.update({
    writes: FieldValue.increment(count),
  });
}

export async function incrementMessages(
  phone: string
): Promise<DailyStats> {
  const today = getTodayKey();
  const statsRef = db.collection("stats").doc(today);
  const doc = await statsRef.get();
  const current = doc.data() as DailyStats;

  const users = current?.uniqueUsers || [];
  if (!users.includes(phone)) {
    users.push(phone);
  }

  await statsRef.update({
    messagesProcessed: FieldValue.increment(1),
    uniqueUsers: users,
  });

  return { ...(current || {}), uniqueUsers: users } as DailyStats;
}

export async function checkLimits(): Promise<{
  status: "ok" | "warning" | "critical";
  details: Record<string, { used: number; limit: number; pct: number }>;
  alerts: string[];
}> {
  const stats = await getTodayStats();
  const alerts: string[] = [];
  let status: "ok" | "warning" | "critical" = "ok";

  const details: Record<
    string,
    { used: number; limit: number; pct: number }
  > = {};

  for (const [key, limit] of Object.entries(LIMITS)) {
    const used = stats[key as keyof typeof LIMITS] || 0;
    const pct = used / limit;

    details[key] = { used, limit, pct: Math.round(pct * 100) };

    if (pct >= ALERT_THRESHOLDS.critical) {
      status = "critical";
      alerts.push(
        `${key}: ${Math.round(pct * 100)}% usado (${used}/${limit})`
      );
    } else if (pct >= ALERT_THRESHOLDS.warning) {
      if (status !== "critical") status = "warning";
      alerts.push(
        `${key}: ${Math.round(pct * 100)}% usado (${used}/${limit})`
      );
    }
  }

  if (alerts.length > 0) {
    const statsRef = db.collection("stats").doc(getTodayKey());
    await statsRef.update({ alerts }).catch(() => {});
  }

  return { status, details, alerts };
}
