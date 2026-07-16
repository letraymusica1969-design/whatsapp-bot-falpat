import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { join } from "path";

if (!getApps().length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    const keyPath = join(process.cwd(), "FIREBASE", "whatsapp-bot-falpat-firebase-adminsdk-fbsvc-069357f943.json");
    const serviceAccount = JSON.parse(readFileSync(keyPath, "utf-8"));
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

export const db = getFirestore();
