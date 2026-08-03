import { db } from "./firebase";

export interface LearnedItem {
  q: string;
  a: string;
  count: number;
  lastAt: string;
}

const MAX_LEARNED = 15;

let learnedCache: LearnedItem[] | null = null;
let learnedCacheTime = 0;

function normalize(q: string): string {
  return q.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export async function rememberExchange(phone: string, q: string, a: string): Promise<void> {
  try {
    const key = normalize(q);
    if (!key) return;

    const docRef = db.collection("config").doc("bot");
    const doc = await docRef.get();
    const learned: LearnedItem[] = (doc.exists ? (doc.data()?.learned as LearnedItem[] | undefined) : undefined) || [];
    const now = new Date().toISOString();

    const idx = learned.findIndex((l) => normalize(l.q) === key);

    let next: LearnedItem[];
    if (idx >= 0) {
      next = learned.map((l, i) =>
        i === idx ? { ...l, q: l.q, a, count: l.count + 1, lastAt: now } : l
      );
    } else {
      next = [...learned, { q, a, count: 1, lastAt: now }];
    }

    next.sort((x, y) => y.count - x.count || y.lastAt.localeCompare(x.lastAt));
    next = next.slice(0, MAX_LEARNED);

    await docRef.set({ learned: next }, { merge: true });
  } catch (error) {
    console.error(`[learn] Error guardando intercambio de ${phone}:`, error);
  }
}

export async function getLearned(): Promise<LearnedItem[]> {
  const now = Date.now();
  if (learnedCache && now - learnedCacheTime < 60000) {
    return learnedCache;
  }

  try {
    const doc = await db.collection("config").doc("bot").get();
    learnedCache = (doc.exists ? (doc.data()?.learned as LearnedItem[] | undefined) : undefined) || [];
    learnedCacheTime = now;
  } catch {
    learnedCache = learnedCache || [];
  }

  return learnedCache;
}
