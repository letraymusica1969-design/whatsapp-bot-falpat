# 02 — Credenciales

Todos los secretos y claves necesarias para que el proyecto funcione.

---

## Archivos que NO están en GitHub (hay que copiarlos a cada PC)

| Archivo | Contenido | ¿Para qué sirve? |
|---------|-----------|------------------|
| `.env.local` | Service account JSON + API keys | Conecta Firebase, Groq AI y WhatsApp API |

Dónde están en la PC original:

```
📁 Guia/confidencial/.env.local    ← copia lista para llevar
📁 whatsapp-bot-falpat/.env.local  ← original
```

Para pasar a otra PC:
1. Copiar la carpeta `Guia/` completa por USB
2. Mover el archivo:
   ```
   Guia/confidencial/.env.local  →  whatsapp-bot-falpat/.env.local
   ```

---

## Variables de entorno necesarias

```
# Firebase (opción segura para Vercel)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}

# Firebase (fallback para local)
FIREBASE_PROJECT_ID=falpat-bot
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@falpat-bot.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE..."

# Groq (Llama 3.3 70B)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=1295937623597311
WHATSAPP_ACCESS_TOKEN=EAAXcDZAAaZ...
WHATSAPP_VERIFY_TOKEN=falpat-bot-2024

# Admin Panel (API key para endpoints protegidos)
MONITOR_SECRET_KEY=falpat-stats-2024
```

---

## Cómo regenerar FIREBASE_SERVICE_ACCOUNT (si perdés el archivo)

1. Andá a https://console.firebase.google.com/project/falpat-bot
2. ⚙ → Configuración del proyecto → Cuentas de servicio
3. Botón "Generar nueva clave privada"
4. Descargar el JSON
5. Copiar el contenido COMPLETO del JSON y pegarlo como valor de `FIREBASE_SERVICE_ACCOUNT`

⚠️ **Importante:** El JSON debe ir en UNA sola línea con `\n` escapados.
No pegues el JSON formateado en múltiples líneas.

---

## Cómo regenerar GROQ_API_KEY

1. Andá a https://console.groq.com/
2. Crear cuenta o loguearse
3. API Keys → Create API Key
4. Copiar la key

---

## Cómo regenerar WHATSAPP_ACCESS_TOKEN

1. Andá a https://developers.facebook.com/
2. My Apps → Seleccionar la app del bot
3. WhatsApp → Configuration → API Tokens
4. Generate new token

---

## Variables en Vercel

En https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/settings/environment-variables
están configuradas las mismas variables del `.env.local`.
No hace falta tocarlas.

---

## Acceso al Admin Panel

| Campo | Valor |
|-------|-------|
| URL | https://whatsapp-bot-falpat.vercel.app/admin?key=falpat-stats-2024 |
| Usuario | `ADMIN` |
| Contraseña | `123456` |
| API Key | `falpat-stats-2024` |

La API key se usa en la URL para acceder a endpoints protegidos.
El admin panel usa Basic Auth (usuario/contraseña).
