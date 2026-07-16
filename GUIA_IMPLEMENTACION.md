# Paso a Paso: WhatsApp AI Bot - Implementación Completa

## FASE 1: Firebase (Base de Datos)

### 1.1 Crear proyecto Firebase
1. Ir a https://console.firebase.google.com
2. Click "Crear proyecto"
3. Nombre: `whatsapp-bot-falpat`
4. Desactivar Google Analytics (opcional)
5. Click "Crear proyecto"

### 1.2 Obtener credenciales Admin
1. Ir a Configuración del proyecto (icono engranaje)
2. Pestaña "Cuentas de servicio"
3. Click "Generar nueva clave privada"
4. Se descargará un archivo JSON - **GUARDALO SEGURO**

### 1.3 Crear base de datos Firestore
1. En Firebase Console, click "Firestore Database"
2. Click "Crear base de datos"
3. Seleccionar "Modo de prueba" (para empezar)
4. Seleccionar región: `southamerica-east1` (Buenos Aires)
5. Click "Activar"

### 1.4 Extraer credenciales del JSON
Del archivo JSON descargado, necesitas:
```
project_id → FIREBASE_PROJECT_ID
client_email → FIREBASE_CLIENT_EMAIL
private_key → FIREBASE_PRIVATE_KEY
```

---

## FASE 2: Meta Business (WhatsApp API)

### 2.1 Crear cuenta Meta Business
1. Ir a https://business.facebook.com
2. Crear cuenta o usar existente
3. Completar datos del negocio

### 2.2 Crear App de WhatsApp
1. Ir a https://developers.facebook.com
2. Click "Mis Apps" → "Crear App"
3. Tipo: "Business"
4. Nombre: `WhatsApp Bot FALPAT`
5. Click "Crear App"

### 2.3 Configurar WhatsApp
1. En tu app, ir a "WhatsApp" → "Getting Started"
2. **Phone Number ID**: Anotar este número (es tu WHATSAPP_PHONE_NUMBER_ID)
3. **Permanent Token**: Copiar (es tu WHATSAPP_ACCESS_TOKEN)

### 2.4 Registrar número de teléfono
1. En WhatsApp Manager: https://business.facebook.com/wa/manage/phone-numbers/
2. Click "Agregar número de teléfono"
3. Ingresar: `+54 9 11 3197 2072`
4. Verificar por SMS o llamada
5. **IMPORTANTE**: Este es el número que USARÁ el bot

### 2.5 Crear número de WhatsApp Business
1. Descargar WhatsApp Business en tu celular
2. Registrar con el número `+54 9 11 3197 2072`
3. Completar perfil del negocio
4. **NO usar el mismo número que el bot** si ya tenés WhatsApp personal

---

## FASE 3: OpenAI (Inteligencia Artificial)

### 3.1 Crear cuenta OpenAI
1. Ir a https://platform.openai.com
2. Crear cuenta o login
3. Ir a "API Keys"
4. Click "Create new secret key"
5. Copiar: `sk-proj-...` (es tu OPENAI_API_KEY)

### 3.2 Configurar límites de gasto
1. Ir a "Settings" → "Limits"
2. Establecer límite mensual: $10-20 USD (para empezar)
3. Esto evita sorpresas de facturación

---

## FASE 4: Vercel (Hosting)

### 4.1 Crear cuenta Vercel
1. Ir a https://vercel.com
2. Crear cuenta con GitHub
3. Plan Hobby (gratuito)

### 4.2 Preparar el código
1. Crear carpeta `Bot` en tu PC
2. Copiar todos los archivos del proyecto
3. Inicializar Git:
```bash
cd Bot
git init
git add .
git commit -m "Initial commit"
```

### 4.3 Crear repositorio GitHub
1. Ir a https://github.com
2. Click "+" → "New repository"
3. Nombre: `whatsapp-ai-bot`
4. **NO inicializar** con README
5. Click "Create repository"

### 4.4 Subir código a GitHub
```bash
git remote add origin https://github.com/TU-USUARIO/whatsapp-ai-bot.git
git push -u origin main
```

### 4.5 Deploy en Vercel
1. Ir a https://vercel.com/new
2. Seleccionar tu repositorio `whatsapp-ai-bot`
3. Framework: Next.js (detecta automáticamente)
4. **NO deployear aún** - primero configurar variables

---

## FASE 5: Variables de Entorno

### 5.1 En Vercel
1. En tu proyecto Vercel, ir a "Settings" → "Environment Variables"
2. Agregar cada variable:

| Variable | Valor |
|----------|-------|
| `FIREBASE_PROJECT_ID` | `whatsapp-bot-falpat` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-xxxxx@whatsapp-bot-falpat.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | `"-----BEGIN PRIVATE KEY-----\nMIIEvQ...-----END PRIVATE KEY-----\n"` |
| `OPENAI_API_KEY` | `sk-proj-...` |
| `WHATSAPP_PHONE_NUMBER_ID` | `123456789` |
| `WHATSAPP_ACCESS_TOKEN` | `EAABxxxxxx` |
| `WHATSAPP_VERIFY_TOKEN` | `mi-token-secreto-123` |
| `MONITOR_SECRET_KEY` | `clave-secreta-456` |

3. Click "Save"
4. Ahora sí, hacer deploy

---

## FASE 6: Conectar WhatsApp con el Bot

### 6.1 Obtener URL del webhook
Después del deploy, Vercel te da una URL como:
```
https://whatsapp-ai-bot.vercel.app
```
Tu webhook será:
```
https://whatsapp-ai-bot.vercel.app/api/webhook
```

### 6.2 Configurar webhook en Meta
1. Ir a https://developers.facebook.com
2. Seleccionar tu app → WhatsApp → Configuration
3. En "Webhook", click "Edit"
4. Callback URL: `https://whatsapp-ai-bot.vercel.app/api/webhook`
5. Verify Token: `mi-token-secreto-123` (el mismo del .env)
6. Click "Verify and Save"
7. En "Webhook fields", suscribirse a: `messages`

### 6.3 Probar el bot
1. Enviar mensaje al número `+54 9 11 3197 2072`
2. El bot debería responder automáticamente
3. Revisar logs en Vercel: https://vercel.com/TU-USUARIO/whatsapp-ai-bot/deployments

---

## FASE 7: Monitoreo

### 7.1 Verificar stats
Acceder a:
```
https://whatsapp-ai-bot.vercel.app/api/stats?key=TU-MONITOR-SECRET-KEY
```

### 7.2 Respuesta esperada
```json
{
  "status": "ok",
  "today": "2024-01-15",
  "usage": {
    "reads": { "used": 150, "limit": 50000, "pct": 0 },
    "writes": { "used": 75, "limit": 20000, "pct": 0 }
  },
  "alerts": [],
  "messagesProcessed": 50,
  "uniqueUsers": 12
}
```

### 7.3 Alertas automáticas
- **warning** (70%): Aviso
- **critical** (90%): Bot bloqueado temporalmente

---

## FASE 8: Horario del Bot

### Horario configurado (Argentina):
| Día | Bot APAGADO | Bot ENCENDIDO |
|-----|-------------|---------------|
| Lunes | 08:00 - 17:00 | 17:00 - 08:00 |
| Martes | 08:00 - 17:00 | 17:00 - 08:00 |
| Miércoles | 08:00 - 17:00 | 17:00 - 08:00 |
| Jueves | 08:00 - 17:00 | 17:00 - 08:00 |
| Viernes | 08:00 - 17:00 | 17:00 - 08:00 |
| Sábado | 00:00 - 14:00 | 14:00 - 24:00 |
| Domingo | - | Todo el día (24h) |

Cuando el bot está apagado, responde automáticamente:
> "Nuestro horario de atención es de lunes a viernes de 8:00 a 17:00 hs. Los sábados hasta las 14:00 hs. ¡Te responderemos cuando estemos disponibles!"

---

## TROUBLESHOOTING

### El bot no responde
1. Verificar logs en Vercel
2. Verificar que el webhook esté configurado correctamente
3. Verificar que el número de WhatsApp Business esté verificado

### Errores de Firebase
1. Verificar que las credenciales sean correctas
2. Verificar que Firestore esté en modo de prueba o producción

### Errores de OpenAI
1. Verificar que la API key sea válida
2. Verificar que tengas créditos/saldo

### El bot responde fuera de horario
1. Verificar que la zona horaria sea correcta (`America/Argentina/Buenos_Aires`)
2. Revisar logs para ver la hora que está usando

---

## COMANDOS ÚTILES

```bash
# Ver stats del bot
curl "https://whatsapp-ai-bot.vercel.app/api/stats?key=TU-CLAVE"

# Ver logs en tiempo real
vercel logs whatsapp-ai-bot

# Redesployar
vercel --prod
```

---

## COSTOS ESTIMADOS (Mensual)

| Servicio | Costo |
|----------|-------|
| Firebase Spark | $0 (gratis) |
| Vercel Hobby | $0 (gratis) |
| OpenAI | $5-15 USD (según uso) |
| WhatsApp Business API | $0 (primeras 1000 conversaciones/mes gratis) |
| **Total** | **$5-15 USD/mes** |
