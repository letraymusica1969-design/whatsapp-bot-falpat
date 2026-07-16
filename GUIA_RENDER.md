# Deploy en Render (Gratis)

## Paso 1: Crear cuenta en Render
1. Andá a https://render.com
2. Click **"Get Started for Free"**
3. Logueate con GitHub

## Paso 2: Crear Nuevo Web Service
1. Click **"New +"** → **"Background Worker"**
2. Conectá tu repositorio `whatsapp-bot-falpat`
3. Configurá:
   - **Name**: `falpat-whatsapp-bot`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

## Paso 3: Variables de Entorno
En **Environment → Environment Variables**, agregá:

| Variable | Valor |
|----------|-------|
| `GROQ_API_KEY` | `gsk_...` (tu key de Groq) |
| `MONITOR_SECRET_KEY` | `falpat-stats-2024` |

## Paso 4: Deploy
1. Click **"Create Web Service"**
2. Esperá a que compile
3. Andá a **"Logs"** para ver el QR code
4. Escaneá el QR con tu WhatsApp

## Paso 5: Verificar
1. Enviá un mensaje a tu número de WhatsApp
2. El bot debería responder automáticamente
3. Revisá los logs en Render

---

## Notas Importantes

### El QR aparece en los Logs
- Andá a **Logs** en Render
- Buscá el QR code
- Escanealo con WhatsApp Business en tu celular

### Si el bot se desconecta
- Render reconecta automáticamente
- Pero si perdés la sesión, borra la carpeta `sessions` y redeploya

### Límites del plan Free
- 750 horas/mes (suficiente para tu caso)
- Se duerme después de 15 min sin requests
- Se despierta cuando llega un mensaje

### Monitoreo
```
https://tu-app.onrender.com/api/stats?key=falpat-stats-2024
```

---

## Stack Completo (Todo Gratis)

| Servicio | Plan | Costo |
|----------|------|-------|
| **Groq** (IA) | Free | $0 |
| **Firebase** (DB) | Spark | $0 |
| **Render** (Server) | Free | $0 |
| **WhatsApp** (API) | Web.js | $0 |
| **Total** | | **$0** |
