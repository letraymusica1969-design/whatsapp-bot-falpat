# HANDOFF — Proyecto WhatsApp AI Bot FALPAT

> **Documento de transferencia**: cualquier AI o desarrollador debe poder retomar este proyecto solo con leer este archivo y los archivos que referencia.
>
> Última actualización: **31 jul 2026**

---

## 1. RESUMEN EJECUTIVO

Bot de WhatsApp con IA para **Grupo Falpat SRL** (Luján, Buenos Aires). Responde automáticamente a los clientes usando Groq (LLM gratis) con un system prompt configurable en Firebase.

**El bot YA FUNCIONA con el número real en modo desarrollo (app de Meta sin publicar).**

### Stack
- **Hosting**: Vercel (Hobby, gratis) → `https://whatsapp-bot-falpat.vercel.app`
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Base de datos**: Firebase Firestore (Spark, gratis), región `southamerica-east1`
- **IA**: Groq, modelo `llama-3.3-70b-versatile` (gratis)
- **WhatsApp**: Meta Cloud API (WABA "Falpat", número real de la empresa)

---

## 2. ESTADO ACTUAL (31 jul 2026)

| Item | Estado |
|---|---|
| Bot enviando con número real (+54 9 11 3644 7541) | ✅ **FUNCIONANDO** |
| Bot **recibiendo** mensajes reales (webhook entrante) | ✅ **FUNCIONANDO** (el webhook entrante SÍ se entrega en modo desarrollo) |
| Token permanente (System User, caducidad "Nunca") | ✅ **GENERADO** 31 jul 2026 (reemplaza al token de usuario que expiró) |
| Número verificado en Meta (`code_verification_status: VERIFIED`) | ✅ |
| Webhook configurado (URL, token y campo `messages`) | ✅ **CORRECTO** (confirmado en UI: Use cases → Customize → Configuration) |
| Token con acceso a la WABA real | ✅ (guardado en `face\whatsapp-token.txt`) |
| Verificación del negocio (Grupo Falpat SRL) | ⏳ **En revisión** por Meta (~2 días hábiles) |
| Revisión de la app (App Review) | 🔒 **Bloqueada** hasta que aprueben la verificación del negocio |
| App publicada ("Live" en Meta) | ❌ **Pendiente** — la app está en modo desarrollo |
| `.env.local` local | ⚠️ **DESACTUALIZADO** (apunta al número de test viejo; ver §6) |
| Vercel (variables de producción) | ✅ Correcto (número real + token nuevo) |

### Qué funciona hoy
- Cliente manda mensaje → webhook → IA responde → llega respuesta al cliente.
- Se guarda historial en Firestore (`conversations`, `pendingCalls`).
- Respuesta "fuera de horario" cuando corresponde (ver §7.2).
- Panel admin en `/admin?key=falpat-stats-2024` y stats en `/api/stats`.

### Qué NO funciona todavía (por eso)
- La app de Meta no está **publicada** → los límites y la lista de destinatarios permitidos siguen en modo desarrollo. **Para la atención normal (cliente escribe → el bot responde) ya NO es bloqueante**: el webhook entrante SÍ se entrega sin publicar.
- La verificación del negocio está en revisión → bloquea la App Review → bloquea la publicación (requerida para escalar / destinatarios ilimitados).

---

## 3. IDENTIFICADORES CLAVE (Meta / Firebase / Vercel)

### Meta
| Concepto | Valor |
|---|---|
| App ID | `1649325693862297` |
| Nombre de la app | FALPAT Bot |
| URL de la app | https://developers.facebook.com/apps/1649325693862297/ |
| **Phone Number ID (real)** | `1213340338532300` |
| Número de teléfono real | `+54 9 11 3644 7541` |
| **WABA real (conectada a la app)** | `1980423689339319` (nombre: "Falpat") |
| WABA duplicada (sin teléfono) | `1056213376904861` — ignorar |
| WABA duplicada (mismo nº, NO verificada) | `3548706541965472` — NO usar, puede dar conflictos |
| WABA de test (vieja) | `1760152922104860` (Test WhatsApp Business Account, nº +1 555-138-2803, Phone Number ID `1295937623597311`) |
| Verify token (webhook) | `falpat-bot-2024` |
| Webhook URL | `https://whatsapp-bot-falpat.vercel.app/api/webhook` |

### Empresa / verificación
| Concepto | Valor |
|---|---|
| Razón social | GRUPO FALPAT SOCIEDAD DE RESPONSABILIDAD LIMITADA |
| CUIT | `30-71784388-2` |
| Forma jurídica | S.R.L. (contrato social 26-08-2022) |
| Domicilio | Ruta 6 KM 156, Luján, Buenos Aires |
| Email corporativo | `grupo@falpat.com.ar` (usado como vínculo de verificación) |
| Portfolio comercial | "Falpat" (verificación del negocio enviada, **en revisión**) |
| Cuenta Facebook (dueño) | Marcos Falpat (cuenta personal; portfolio "Tu cuenta" con 1 activo) |

### Vercel
| Concepto | Valor |
|---|---|
| Proyecto | `whatsapp-bot-falpat` |
| URL | https://whatsapp-bot-falpat.vercel.app |
| Admin panel | https://whatsapp-bot-falpat.vercel.app/admin?key=falpat-stats-2024 |
| Stats API | https://whatsapp-bot-falpat.vercel.app/api/stats?key=falpat-stats-2024 |
| Logs | https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/logs |

### Firebase
| Concepto | Valor |
|---|---|
| Project ID | `whatsapp-bot-falpat` |
| Región Firestore | `southamerica-east1` (Buenos Aires) |
| Colecciones | `conversations`, `pendingCalls`, `config` (doc `bot`) |

---

## 4. ARQUITECTURA DEL CÓDIGO

```
Bot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── webhook/route.ts   → GET (challenge) + POST (mensajes entrantes)
│   │   │   └── stats/route.ts     → métricas de uso
│   │   └── admin/                 → panel de configuración
│   ├── lib/
│   │   ├── whatsapp.ts            → sendWhatsAppMessage() (Graph API v21.0)
│   │   ├── ai.ts                  → Groq, buildSystemPrompt() desde Firebase config
│   │   ├── firebase.ts            → Admin SDK (FIREBASE_SERVICE_ACCOUNT o vars sueltas)
│   │   ├── monitor.ts             → límites de lectura/escritura Firestore
│   │   └── types.ts               → tipos del webhook
├── .env.local                     → ⚠️ DESACTUALIZADO (ver §6)
├── face/whatsapp-token.txt        → token de acceso con la WABA real (CRÍTICO)
├── HANDOFF.md                     → este documento
└── GUIA_IMPLEMENTACION.md, Guia/, INSTRUCTIVO*.md → guías paso a paso
```

### Flujo del webhook (`src/app/api/webhook/route.ts`)
1. `GET` → responde al challenge si `hub.verify_token === WHATSAPP_VERIFY_TOKEN`.
2. `POST` → lee `body.entry[0].changes[0].value.messages`.
3. Verifica límites de Firestore (si `critical` → 429).
4. Obtiene config de horario desde `config/bot`.
5. Por cada mensaje de texto:
   - Guarda/actualiza `conversations/{phone}` (últimos 20 mensajes).
   - `getAIResponse()` con Groq + history.
   - Si está **fuera** de horario de la empresa → agrega aviso y guarda en `pendingCalls`.
   - `sendWhatsAppMessage(phone, response)`.
6. `incrementMessages(phone)` para el monitor.

### Envío (`src/lib/whatsapp.ts`)
- `POST https://graph.facebook.com/v21.0/{WHATSAPP_PHONE_NUMBER_ID}/messages`
- Header `Authorization: Bearer {WHATSAPP_ACCESS_TOKEN}`
- Mensajes de tipo `text` (solo responde en conversaciones iniciadas por el cliente → gratis).

### IA (`src/lib/ai.ts`)
- System prompt construido desde `config/bot` en Firestore (nombre, dirección, productos, servicios, FAQ, instrucciones personalizadas).
- Modelo `llama-3.3-70b-versatile`, `max_tokens: 500`, `temperature: 0.5`.
- Siempre responde en español; no inventa precios.

### Horario y modo del bot (regla `isBotActiveBySchedule` + `botMode` en `config/bot`)
El bot responde **fuera** del horario de atención humano:
- Lun a Vie: bot activo 17:00 → 08:00 (8-17 atiende la persona).
- Sábado: bot activo desde 14:00 (8-14 atiende la persona).
- Domingo: bot activo todo el día.
- Cuando el humano está atendiendo, el bot **NO responde** (se queda callado para no duplicar respuestas).
- Cuando responde fuera de horario, agrega: *"Puesto que es fuera de nuestro horario de atención (Lun-Vie 8-17hs, Sáb hasta 14hs), un representante te contactará a la brevedad."* y guarda en `pendingCalls`.
- **Modo manual (override)** editable desde el panel admin (barra superior y Configuración):
  - `auto` (default): sigue el horario de arriba.
  - `on`: bot siempre responde (agrega el aviso de horario).
  - `off`: bot nunca responde (para cuando se quedan atendiendo fuera de horario).
  - El vendedor lo cambia desde el celular abriendo `https://whatsapp-bot-falpat.vercel.app/admin?key=falpat-stats-2024`.

---

## 5. VARIABLES DE ENTORNO

### En Vercel (producción — CORRECTO, así debe quedar)
| Variable | Valor |
|---|---|
| `WHATSAPP_PHONE_NUMBER_ID` | `1213340338532300` |
| `WHATSAPP_ACCESS_TOKEN` | el token de `face\whatsapp-token.txt` |
| `WHATSAPP_VERIFY_TOKEN` | `falpat-bot-2024` |
| `MONITOR_SECRET_KEY` | `falpat-stats-2024` |
| `GROQ_API_KEY` | la de `.env.local` |
| `FIREBASE_PROJECT_ID` | `whatsapp-bot-falpat` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-fbsvc@whatsapp-bot-falpat.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | la de `.env.local` (con `\n` escapados) |
| `FIREBASE_SERVICE_ACCOUNT` | (opcional, JSON completo si se usa) |

> Para editar: https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/settings/environment-variables → luego **Redeploy**.

### `.env.local` (local) — ✅ ACTUALIZADO (31 jul 2026)
- `WHATSAPP_PHONE_NUMBER_ID=1213340338532300` (número real) y `WHATSAPP_ACCESS_TOKEN` = token permanente de `face\whatsapp-token.txt`.
- **No commitear `.env.local`** (está en `.gitignore`).

---

## 6. SECRETOS Y ARCHIVOS CRÍTICOS

| Archivo | Qué contiene | Estado |
|---|---|---|
| `face\whatsapp-token.txt` | Token **permanente** (System User) de acceso a la **WABA real** (`WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_WABA_ID`, `VERIFY_TOKEN`) | ✅ **PERMANENTE** (caducidad "Nunca", 31 jul 2026) |
| `.env.local` | Groq key, Firebase admin key, token permanente | ✅ Actualizado (31 jul 2026) |

- El token de `face\whatsapp-token.txt` es **permanente (System User, caducidad "Nunca")**: NO expira. El token anterior (de usuario, corta duración) **expiró** y causó el error 190. Ver §7.4.

---

## 7. PASOS PENDIENTES (en orden)

> Estado actual: bloqueado esperando la **verificación del negocio** de Meta.

### 7.1 Esperar la verificación del negocio (YA ENVIADA)
- Estado: "Verificación para Grupo Falpat SRL — **En revisión**" (tarda ~2 días hábiles).
- Documento subido: constancia de AFIP (CUIT 30-71784388-2). Vínculo: email `grupo@falpat.com.ar`.
- Dónde ver: app → Revisión de la app / Verificación, o Business Settings → Centro de seguridad.
- Cuando pase a aprobada → se habilita "Enviar para revisión".

### 7.2 Enviar y aprobar la App Review
- App dashboard → **"Revisión de la app"** → la solicitud está "No enviada".
- Permisos a solicitar (ya preparados): `whatsapp_business_messaging` + `whatsapp_business_management`.
- Requisitos ya cumplidos: config de la app, uso permitido (descripción + video `FALPAT-Bot-demo.mp4`), tratamiento de datos, instrucciones para revisores, **llamada de prueba completada** (mensaje enviado y recibido).
- Nota: el aviso "Reste a un método de pago" es **ignorable** (conversaciones iniciadas por el cliente = gratuitas, sin método de pago requerido).
- Cuando se apruebe → aparece el botón **"Publicar"**.

### 7.3 Publicar la app (para escalar, NO bloquea la atención normal)
- Dashboard de la app → **"Publicar"** (sale de "En desarrollo" → "Live").
- ⚠️ **ACLARACIÓN (31 jul 2026)**: se creyó que sin publicar no llegaban webhooks reales. **FALSO** — el webhook entrante SÍ se entrega en modo desarrollo (verificado en logs: `POST /api/webhook 200`). El "bot dejó de responder" fue por el **token expirado** (error 190), no por la app sin publicar.
- Publicar igual conviene para: destinatarios ilimitados (sin la lista manual de prueba), subir el throughput y producción plena.

### 7.4 Token permanente (System User) — ✅ HECHO (31 jul 2026)
- **RESUELTO**: se creó el usuario del sistema `bot-falpat` (ID `61592407422955`) en Business Settings → Usuarios del sistema, se le asignó el activo **FALPAT Bot** (acceso total: Administrar app) y se generó token con caducidad **"Nunca"**.
- El token nuevo está en `face\whatsapp-token.txt`, en `.env.local` y en Vercel (producción, redeploy hecho). Verificado: envía mensajes y accede a la WABA real.
- Por qué: el token anterior era de **usuario de corta duración** y expiró (error 190 "Authentication Error"), por eso el bot dejó de responder a las ~13:15. La salida fallaba; la entrada (webhook) siempre funcionó.
- Si se regenera: Business Settings → Usuarios del sistema → `bot-falpat` → Generar token → app FALPAT Bot → Caducidad "Nunca". Guardar en `face\whatsapp-token.txt` y actualizar Vercel → Redeploy.

### 7.5 Actualizar `.env.local` (desarrollo local) — ✅ HECHO (31 jul 2026)
- `WHATSAPP_PHONE_NUMBER_ID=1213340338532300`
- `WHATSAPP_ACCESS_TOKEN=<token permanente de face\whatsapp-token.txt>`

---

## 8. CÓMO PROBAR (modo desarrollo, ya verificado)

### Prueba manual completa (funciona hoy, verificado 31 jul 2026)
1. Desde un celular con WhatsApp, escribirle al número **+54 9 11 3644 7541** (ej. "Hola").
2. El bot responde con la IA (Groq) y el system prompt de Firebase.
3. Verificar en los logs: https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/logs
   - Deben aparecer `POST /api/webhook 200` y `[5491141751031] Enviado: true`.
4. **Si no responde**: revisar en los logs si aparece `Error enviando mensaje: { error: { code: 190 ...` → token inválido (regenerar, §7.4). Si NO aparece ningún `POST /api/webhook`, el problema es de entrega de Meta.

### Prueba por API (Graph API Explorer)
- Explorer: https://developers.facebook.com/tools/explorer/ (app FALPAT Bot).
- Consultas útiles:
  - `GET /1980423689339319/phone_numbers` → verifica el número real (VERIFIED).
  - `GET /1980423689339319/message_templates` → plantillas disponibles.
  - `POST /1213340338532300/messages` con template **solo funciona con plantillas propias** (la `hello_world` SOLO se puede enviar desde números de test).

### Prueba de webhook (challenge)
- `GET https://whatsapp-bot-falpat.vercel.app/api/webhook?hub.mode=subscribe&hub.verify_token=falpat-bot-2024&hub.challenge=test123` → debe responder `test123`.

---

## 9. PROBLEMAS CONOCIDOS / ADVERTENCIAS

1. **WABAs duplicadas**: el número +54 9 11 3644 7541 aparece en 2 WABAs (1980423689339319 "CONECTADO" y 3548706541965472 "NO VERIFICADO"). Usar SIEMPRE la `1980423689339319`. La duplicada puede pedir ser eliminada si da conflictos.
2. **Token**: ya es **permanente** (System User, "Nunca"). Si algún día vuelve el error 190 "Authentication Error" en los logs, es el token: regenerar (ver §7.4) y actualizar Vercel.
3. **`.env.local`**: ya apunta al número real (`1213340338532300`) y al token permanente (§7.5).
4. **Método de pago**: Meta puede pedir tarjeta. Para este caso (solo conversaciones iniciadas por el cliente) **no es necesario** y el período gratuito aplica.
5. **Códigos de verificación por SMS**: tienen límite diario; se reinicia solo con el tiempo. El número ya está VERIFIED, así que no hace falta.
6. **hello_world**: la plantilla de ejemplo SOLO se envía desde números de test. Para envíos proactivos (marketing/recordatorios) hay que crear plantillas propias y aprobarlas.
7. **Error 190 "Authentication Error" (RESUELTO 31 jul 2026)**: el token de usuario expiró y el bot dejó de responder (la entrada funcionaba, la salida fallaba). Síntoma en logs: `POST /api/webhook 200` + `Error enviando mensaje: { error: { code: 190 ...`. Se arregló con el token permanente de System User. Si reaparece, regenerar (§7.4).

---

## 10. URLs ÚTILES

| Servicio | URL |
|---|---|
| App de Meta (FALPAT Bot) | https://developers.facebook.com/apps/1649325693862297/ |
| App Review | https://developers.facebook.com/apps/1649325693862297/review/ |
| Webhooks (Configuración del caso de uso) | https://developers.facebook.com/apps/1649325693862297/use_cases/customize/ → pestaña **Configuración** (es donde está el webhook para apps del caso de uso WhatsApp) |
| Graph API Explorer | https://developers.facebook.com/tools/explorer/ |
| WhatsApp Manager (WABA real) | https://business.facebook.com/settings/ |
| Business Settings | https://business.facebook.com/settings/ |
| Vercel proyecto | https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat |
| Vercel env vars | https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/settings/environment-variables |
| Vercel logs | https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/logs |
| Firebase console | https://console.firebase.google.com/project/whatsapp-bot-falpat |
| Groq console | https://console.groq.com |

---

## 11. COSTOS

| Servicio | Costo |
|---|---|
| Vercel Hobby | $0 |
| Firebase Spark | $0 |
| Groq (llama-3.3-70b) | $0 (free tier) |
| WhatsApp Cloud API | $0 (conversaciones iniciadas por el cliente, período gratuito) |
| **Total** | **~$0/mes** |
