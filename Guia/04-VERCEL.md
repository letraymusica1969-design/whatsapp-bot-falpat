# 04 — Vercel

Configuración del deployment automático.

---

## Producción

**URL:** https://whatsapp-bot-falpat.vercel.app

Cada `git push` a `main` despliega automáticamente.

---

## Dashboard

https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat

Desde acá se puede ver:

| Sección | Qué muestra |
|---------|-------------|
| **Deployments** | Historial de builds, logs de error |
| **Environment Variables** | Las variables del `.env.local` |
| **Domains** | Dominio personalizado (si se agrega) |
| **Analytics** | Estadísticas de visitas |
| **Logs** | Logs de serverless functions |

---

## Configurar Vercel desde otra PC

Solo si querés hacer deploy manual o ver logs desde CLI:

```bash
npm i -g vercel
vercel login
vercel link     # vincular al proyecto whatsapp-bot-falpat
vercel env pull # descargar .env.local desde Vercel
```

---

## Variables de entorno en Vercel

Ya están configuradas. Si cambiás algo, actualizalas en:
Vercel Dashboard → Project → Settings → Environment Variables

| Variable | Valor |
|----------|-------|
| FIREBASE_SERVICE_ACCOUNT | JSON completo del service account (una línea) |
| GROQ_API_KEY | gsk_p8o3uguK2z... |
| WHATSAPP_PHONE_NUMBER_ID | 1295937623597311 |
| WHATSAPP_ACCESS_TOKEN | EAAXcDZAAaZ... |
| WHATSAPP_VERIFY_TOKEN | falpat-bot-2024 |
| MONITOR_SECRET_KEY | falpat-stats-2024 |

---

## Build settings

| Configuración | Valor |
|---------------|-------|
| Framework | Next.js |
| Build command | `npm run build` |
| Output directory | `.next` |
| Node.js version | 20.x (por defecto) |

---

## Errores comunes de build

### Firebase `project_id` missing
Causa: Las variables de Firebase no están en Vercel.
Solución: Agregar `FIREBASE_SERVICE_ACCOUNT` a las environment variables.

### Groq API key missing at build time
Causa: El cliente Groq se inicializa en import time.
Solución: Usar lazy initialization (`let groq = null; function getGroq() { ... }`).

### `useSearchParams` Suspense boundary
Causa: Next.js 14 requiere `<Suspense>` para `useSearchParams`.
Solución: Envolver el componente que usa `useSearchParams` en `<Suspense>`.
