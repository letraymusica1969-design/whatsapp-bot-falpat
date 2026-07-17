# 03 — Firebase

Configuración y detalles del proyecto Firebase.

---

## Proyecto

| Propiedad | Valor |
|-----------|-------|
| ID del proyecto | `falpat-bot` |
| Plan | **Spark** (gratuito) |
| Límite Spark | ~50.000 lecturas / ~20.000 escrituras / ~20.000 eliminaciones por día |
| Región | `us-central` (por defecto) |

---

## Colecciones en Firestore

| Colección | Tipo de datos | Docs actuales | ¿Se puede resetear? |
|-----------|---------------|---------------|---------------------|
| `conversations/{phone}` | Historial de chats | 12 | ✅ Sí |
| `config/bot` | Configuración del bot | 1 | ❌ No (se resetea solo) |
| `pendingCalls/{phone}` | Llamadas pendientes | 7 | ✅ Sí |
| `stats/{YYYY-MM-DD}` | Estadísticas diarias | variable | ✅ Sí |

---

## Estructura de documentos

### `conversations/{phone}`

```json
{
  "phone": "+541234567890",
  "messages": [
    { "role": "user", "text": "Hola", "at": "2026-07-16T10:00:00Z" },
    { "role": "assistant", "text": "¡Hola!...", "at": "2026-07-16T10:00:02Z" }
  ],
  "createdAt": "2026-07-16T10:00:00Z",
  "updatedAt": "2026-07-16T10:05:00Z"
}
```

Se guardan los últimos 20 mensajes por conversación.

### `config/bot`

```json
{
  "schedule": {
    "timezone": "America/Argentina/Buenos_Aires",
    "rules": {
      "mon": { "open": "17:00", "close": "08:00" },
      "tue": { "open": "17:00", "close": "08:00" },
      "wed": { "open": "17:00", "close": "08:00" },
      "thu": { "open": "17:00", "close": "08:00" },
      "fri": { "open": "17:00", "close": "08:00" },
      "sat": { "open": "14:00", "close": "00:00" },
      "sun": { "open": "00:00", "close": "00:00" }
    }
  },
  "knowledgeBase": {
    "empresa": "...",
    "servicios": "...",
    "productos": "...",
    "faq": "..."
  }
}
```

### `pendingCalls/{phone}`

```json
{
  "phone": "+541234567890",
  "firstMessage": "Hola, quiero un presupuesto",
  "firstMessageAt": "2026-07-16T23:00:00Z",
  "lastMessage": "¿Cuánto sale el hormigón?",
  "lastMessageAt": "2026-07-16T23:05:00Z",
  "messageCount": 3,
  "messages": [
    { "text": "Hola, quiero un presupuesto", "at": "2026-07-16T23:00:00Z" },
    { "text": "¿Cuánto sale el hormigón?", "at": "2026-07-16T23:05:00Z" }
  ],
  "aiSummary": "Cliente interesado en presupuesto de hormigón",
  "status": "pending",
  "createdAt": "2026-07-16T23:00:00Z",
  "updatedAt": "2026-07-16T23:05:00Z"
}
```

### `stats/{YYYY-MM-DD}`

```json
{
  "reads": 150,
  "writes": 45,
  "messages": 30,
  "createdAt": "2026-07-16T00:00:00Z"
}
```

---

## Límite de cuota — ¿Qué pasa cuando se agota?

| Operación | Comportamiento |
|-----------|----------------|
| **Lectura** (getDocs) | Error 429 → el bot deja de responder temporalmente |
| **Escritura** (addDoc, updateDoc) | Error 429 → conversación no se guarda |
| **Tiempo real** (onSnapshot) | No se usa en este proyecto |

### ¿Cómo saber si se agotó la cuota?

Verificar en https://console.firebase.google.com/project/falpat-bot → Usage
o revisar logs de Vercel.

### ¿Qué hacer?

1. Esperar a que se restablezca (suele ser cada 24h)
2. Los datos se pueden exportar desde el admin panel
3. No hay pérdida de datos — solo se dejan de guardar temporalmente

---

## Firebase Admin SDK

Se usa solo para operaciones server-side (webhook, API endpoints).
Requiere `FIREBASE_SERVICE_ACCOUNT` en las variables de entorno.

El JSON del service account se almacena como string en una sola variable de entorno.
En Vercel funciona correctamente porque el JSON se lee como string plano.
