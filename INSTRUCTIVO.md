# INSTRUCTIVO - Bot WhatsApp FALPAT
## Última actualización: 16/07/2026 20:30hs

---

## ESTADO ACTUAL

| Paso | Estado |
|------|--------|
| ✅ Código en GitHub | https://github.com/letraymusica1969-design/whatsapp-bot-falpat |
| ✅ Deploy en Vercel | https://whatsapp-bot-falpat.vercel.app |
| ✅ Firebase | Conectado y funcionando |
| ✅ Groq API Key | Pendiente de agregar en Vercel |
| ✅ Meta Business Creado | Negocio: FALPAT (ID: 2348979458965383) |
| ✅ App Creada | Nombre: FALPAT Bot (App ID: 1649325693862297) |
| ✅ WhatsApp Test Number | +1 (555) 138-2803 (WABA: 1760152922104860) |
| ✅ Webhook | Configurado |
| ⏳ Número real | PENDIENTE - usar chip prepago |

---

## CREDENCIALES IMPORTANTES

```
Phone Number ID (test): 1295937623597311
WhatsApp Business Account ID: 1760152922104860
Access Token: EAAXcDZAAaAZAkBR8jhu9Wun5j6kYnvBqveWfaeCVoUBV7ebZCEZCLPEYu65ZCs09LzBlLFvd4ZBW6ZBdmiZB4iNmNaq4l8AeRtxTOy2P40Q4eabMcaxSKtcc43G2LhdDCB7vfmXhaWXCKHOay8w4PCvSwMzklPTwa883ux14smfYwZCfBp31hfWg6Anyp3GIlPYba1mGna7DFauZBngIoIX3XPfWqa5ZBuPuRK9bwovT7UvJa24Jx9gegZBLTO46yipGiRPQVMYVhKVuKrVZBHoyjkyKxb9WaxPwOQcT0mgbIugZDZD
Verify Token: falpat-bot-2024
```

---

## DECISIÓN: CHIP PREPAGO

Se decidió usar un **chip prepago** en lugar del número de la empresa (+54 9 11 3197 2072) para:
- Proteger la línea de ventas de la empresa
- Si el bot falla, no se pierde acceso a WhatsApp de la empresa
- Si algo sale mal, se puede descartar el chip sin consecuencias

### Chip que se va a comprar mañana:
- Marca: cualquier (Personal, Claro, Movistar)
- Costo: ~$500-1000
- Se necesita celular viejo para activarlo

---

## LO QUE FALTA HACER MAÑANA (EN ESTE ORDEN)

### 1. COMPRAR Y ACTIVAR EL CHIP
1. Comprar chip prepago en kiosco/supermercado/local
2. Activar chip en celular viejo
3. Instalar WhatsApp con el número nuevo
4. Anotar el número exacto

### 2. REGISTRAR EL NÚMERO EN META
1. Ir a: https://business.facebook.com/settings/whatsapp
2. Seleccionar cuenta: "Test WhatsApp Business Account"
3. Ir a "Números de teléfono"
4. Click "Agregar número de teléfono"
5. Ingresar número del chip
6. Verificar por SMS
7. Copiar el **Phone Number ID**

### 3. ACTUALIZAR VERCEL
1. Ir a: https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/settings/environment-variables
2. Actualizar `WHATSAPP_PHONE_NUMBER_ID` con el nuevo ID
3. Guardar
4. Ir a: https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/deployments
5. Click "..." → "Redeploy"

### 4. CONFIGURAR WEBHOOK EN META
1. Ir a: https://developers.facebook.com/apps/1649325693862297/whatsapp-business/
2. En "Webhook", click "Editar"
3. Verificar URL: https://whatsapp-bot-falpat.vercel.app/api/webhook
4. Verificar token: falpat-bot-2024
5. Click "Verificar y guardar"
6. Suscribirse a eventos: **messages**

### 5. PROBAR EL BOT
1. Desde celular personal, mandar mensaje al número del chip
2. Escribir: "Hola, quiero saber precios"
3. Esperar 5-10 segundos
4. El bot debería responder automáticamente

### 6. CONFIGURAR RESPUESTAS DEL BOT (OPCIONAL)
1. Editar `src/lib/ai.ts`
2. Cambiar SYSTEM_PROMPT con información de FALPAT
3. Push a GitHub
4. Redesplegar en Vercel

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
├── INSTRUCTIVO.md              # Este archivo
├── INSTRUCTIVO-CHIP.md         # Instructivo específico para el chip
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
| **Vercel Dashboard** | https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat |
| **Meta Developers** | https://developers.facebook.com |
| **Meta Business** | https://business.facebook.com |
| **Meta WhatsApp Settings** | https://business.facebook.com/settings/whatsapp |
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

### El token no funciona
1. Ir a: https://business.facebook.com/settings/system-users
2. Click en tu usuario
3. Click "Generar nuevo token"
4. Seleccionar app: FALPAT Bot
5. Seleccionar permisos: whatsapp_business_messaging y whatsapp_business_management
6. Click "Generar token"
7. Copiar token y actualizar en Vercel

---

## NOTAS IMPORTANTES

- **Mañana comprar chip prepago** y seguir INSTRUCTIVO-CHIP.md
- **Proteger el número del chip** — es el nuevo "número de atención al cliente"
- **Si algo sale mal**, se puede volver a WhatsApp personal desde el celular en 30 días
- **El bot solo responde fuera del horario laboral** para no interferir con ventas
