import { initializeApp, cert, getApps, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | null = null;
let firestore: Firestore | null = null;

function getApp(): App {
  if (app) return app;

  if (!getApps().length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY;

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
          "Faltan variables de entorno de Firebase"
        );
      }

      const cleanKey = privateKey
        .replace(/^"/, "")
        .replace(/"$/, "")
        .replace(/\\n/g, "\n");

      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: cleanKey,
        }),
      });
    }
  } else {
    app = getApps()[0];
  }

  return app;
}

export function getDb(): Firestore {
  if (firestore) return firestore;
  firestore = getFirestore(getApp());
  return firestore;
}

export const db = new Proxy({} as Firestore, {
  get(_, prop) {
    return (getDb() as any)[prop];
  },
});
