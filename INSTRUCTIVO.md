# INSTRUCTIVO - Bot WhatsApp FALPAT
## Última actualización: 16/07/2026 18:00hs

---

## ESTADO ACTUAL

| Paso | Estado |
|------|--------|
| ✅ Código en GitHub | https://github.com/letraymusica1969-design/whatsapp-bot-falpat |
| ✅ Deploy en Vercel | https://whatsapp-bot-falpat.vercel.app |
| ✅ Firebase | Conectado y funcionando |
| ✅ Groq API Key | Pendiente de agregar en Vercel |
| ✅ Meta Business Creado | Negocio: FALPAT (ID: 2348979458965383) |
| ✅ App Creada | Nombre: FALPAT Bot |
| ✅ WhatsApp Test Number | +1 (555) 138-2803 |
| ⏳ Webhook | PENDIENTE - configurar |
| ⏳ Número real | PENDIENTE - configurar en Paso 2 |

---

## CREDENCIALES IMPORTANTES

```
Phone Number ID: 1295937623597311
WhatsApp Business Account ID: 1760152922104860
Access Token: EAAXcDZAAaAZAkBR8jhu9Wun5j6kYnvBqveWfaeCVoUBV7ebZCEZCLPEYu65ZCs09LzBlLFvd4ZBW6ZBdmiZB4iNmNaq4l8AeRtxTOy2P40Q4eabMcaxSKtcc43G2LhdDCB7vfmXhaWXCKHOay8w4PCvSwMzklPTwa883ux14smfYwZCfBp31hfWg6Anyp3GIlPYba1mGna7DFauZBngIoIX3XPfWqa5ZBuPuRK9bwovT7UvJa24Jx9gegZBLTO46yipGiRPQVMYVhKVuKrVZBHoyjkyKxb9WaxPwOQcT0mgbIugZDZD
Verify Token: falpat-bot-2024
```

---

## LO QUE FALTA HACER (EN ESTE ORDEN)

### 1. CONFIGURAR WEBHOOK (PRIMERO)
El webhook le dice a Meta por dónde enviar los mensajes que llegan al bot.

1. Ir a: https://developers.facebook.com
2. Seleccionar la app **"FALPAT Bot"**
3. Menú izquierdo: **WhatsApp → Configuration** (o **Webhooks**)
4. Buscar sección **"Webhooks"**
5. Pegar estos valores:

| Campo | Valor a pegar |
|-------|---------------|
| **Callback URL** | `https://whatsapp-bot-falpat.vercel.app/api/webhook` |
| **Verify Token** | `falpat-bot-2024` |

6. Click **"Verify and Save"**
7. En **"Webhook fields"**, suscribirse a: **`messages`**

### 2. AGREGAR GROQ API KEY EN VERCEL
1. Ir a: https://console.groq.com
2. Crear cuenta (o loguearse)
3. Ir a **"API Keys"** → **"Create API Key"**
4. Copiar la key (empieza con `gsk_`)
5. Ir a Vercel: https://vercel.com/falpat-bot/whatsapp-bot-falpat/settings/environment-variables
6. Agregar variable:

| Nombre | Valor |
|--------|-------|
| `GROQ_API_KEY` | `gsk_...` (la key que copiaste) |

7. Redeploy: https://vercel.com/falpat-bot/whatsapp-bot-falpat/deployments → **"..." → Redeploy**

### 3. PROBAR EL BOT
1. Enviar mensaje al número de prueba: **+1 (555) 138-2803**
2. El bot debería responder automáticamente
3. Verificar stats: https://whatsapp-bot-falpat.vercel.app/api/stats?key=falpat-stats-2024

### 4. CONFIGURAR NÚMERO REAL (PASO 2)
En el dashboard de Meta:
1. Ir a **WhatsApp → Getting Started**
2. Click **"Paso 2: Configuración de producción"**
3. Agregar el número real de la empresa: **+54 9 11 3197 2072**
4. Verificar por SMS
5. Actualizar en Vercel las variables:
   - `WHATSAPP_PHONE_NUMBER_ID` → el nuevo ID del número real
   - `WHATSAPP_ACCESS_TOKEN` → generar nuevo token permanente

---

## ESTRUCTURA DEL PROYECTO

```
Bot/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout de Next.js
│   │   ├── page.tsx            # Página principal
│   │   └── api/
│   │       ├── webhook/
│   │       │   └── route.ts    # Recibe mensajes de WhatsApp
│   │       └── stats/
│   │           └── route.ts    # Monitoreo de uso
│   └── lib/
│       ├── firebase.ts         # Conexión Firebase
│       ├── ai.ts               # Groq (Llama 3.3 70B)
│       ├── monitor.ts          # Sistema de alertas
│       ├── types.ts            # Tipos TypeScript
│       └── whatsapp.ts         # Envío de mensajes
├── FIREBASE/                   # Clave de servicio (NO subir a git)
│   └── whatsapp-bot-falpat-firebase-adminsdk-fbsvc-069357f943.json
├── .env.local                  # Variables de entorno local
├── .env.example                # Ejemplo de variables
└── package.json
```

---

## STACK COMPLETO (TODO GRATIS)

| Servicio | Plan | Costo |
|----------|------|-------|
| **Groq** (IA - Llama 3.3 70B) | Free | $0 |
| **Firebase** (Firestore) | Spark | $0 |
| **Vercel** (Hosting) | Hobby | $0 |
| **WhatsApp Business API** | Free tier | $0 (1000 conv/mes) |
| **Total** | | **$0** |

---

## HORARIO DEL BOT (Argentina)

| Día | Bot APAGADO | Bot ENCENDIDO |
|-----|-------------|---------------|
| Lunes-Viernes | 08:00 - 17:00 | 17:00 - 08:00 |
| Sábado | 00:00 - 14:00 | 14:00 - 24:00 |
| Domingo | - | Todo el día (24h) |

Cuando el bot está apagado responde:
> "Nuestro horario de atención es de lunes a viernes de 8:00 a 17:00 hs. Los sábados hasta las 14:00 hs. ¡Te responderemos cuando estemos disponibles!"

---

## URLs IMPORTANTES

| Servicio | URL |
|----------|-----|
| **App desplegada** | https://whatsapp-bot-falpat.vercel.app |
| **Webhook** | https://whatsapp-bot-falpat.vercel.app/api/webhook |
| **Stats/Monitoreo** | https://whatsapp-bot-falpat.vercel.app/api/stats?key=falpat-stats-2024 |
| **GitHub** | https://github.com/letraymusica1969-design/whatsapp-bot-falpat |
| **Vercel Dashboard** | https://vercel.com/falpat-bot/whatsapp-bot-falpat |
| **Meta Developers** | https://developers.facebook.com |
| **Meta Business** | https://business.facebook.com |
| **Groq Console** | https://console.groq.com |
| **Firebase Console** | https://console.firebase.google.com/project/whatsapp-bot-falpat |

---

## TROUBLESHOOTING

### El webhook no verifica
- Verificar que la URL sea exacta: `https://whatsapp-bot-falpat.vercel.app/api/webhook`
- Verificar que el token sea: `falpat-bot-2024`
- Verificar que Vercel esté funcionando

### El bot no responde
- Verificar que Groq API key esté en Vercel
- Verificar logs en Vercel: Deployments → click en el deploy → Logs
- Verificar que el webhook esté suscrito a `messages`

### Error 500 en stats
- Verificar que FIREBASE_PRIVATE_KEY esté bien pegada (con `\n` literales)
- Redeployar después de cambiar variables de entorno

### El bot responde fuera de horario
- Verificar zona horaria: `America/Argentina/Buenos_Aires`
- Revisar código en `src/app/api/webhook/route.ts`
