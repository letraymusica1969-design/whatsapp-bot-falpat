# INSTRUCTIVO: Configuración del Chip Prepago y Bot

## RESUMEN
Vamos a usar un chip prepago para el bot de WhatsApp. Esto protege la línea de ventas de la empresa.

---

## PARTE 1: COMPRAR Y ACTIVAR EL CHIP

### Paso 1: Ir a comprar
- Andá a cualquier kiosco, supermercado o local de celular
- Comprá un chip prepago (cualquier marca: Personal, Claro, Movistar)
- Costo: ~$500-1000

### Paso 2: Activar el chip
- Poné el chip en un celular viejo (o segundo celular)
- Seguí las instrucciones que vienen con el chip
- Activá el chip y anotá el número nuevo que te den

### Paso 3: Instalar WhatsApp
- Descargá WhatsApp en ese celular
- Registrate con el número nuevo del chip
- Verificá el código que llega por SMS

### Paso 4: Anotar el número
- Anotá el número exacto (ej: +54 9 11 XXXX XXXX)
- Guardalo en un lugar seguro

---

## PARTE 2: REGISTRAR EL NÚMERO EN META

### Paso 1: Ir a la configuración de WhatsApp
1. Andá a: https://business.facebook.com/settings/whatsapp
2. Hacé clic en "Cuentas de WhatsApp"
3. Seleccioná tu cuenta: "Test WhatsApp Business Account" (1760152922104860)

### Paso 2: Agregar el número
1. Hacé clic en "Números de teléfono"
2. Hacé clic en "Agregar número de teléfono"
3. Ingresá el número del chip (con código de país +54)
4. Elegí cómo querés verificar: **SMS** (más fácil)
5. Esperá el código SMS en el celular con el chip
6. Ingresá el código

### Paso 3: Copiar el Phone Number ID
1. Después de verificar, el número aparecerá en la lista
2. Hacé clic en el número
3. Copiá el **Phone Number ID** (es un número largo)
4. Guardalo en un lugar seguro

---

## PARTE 3: CONFIGURAR EL BOT EN VERCEL

### Paso 1: Actualizar variables de entorno
1. Andá a: https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/settings/environment-variables
2. Buscá la variable `WHATSAPP_PHONE_NUMBER_ID`
3. Actualizá con el nuevo Phone Number ID que copiaste
4. Hací clic en "Save"

### Paso 2: Redesplegar el bot
1. Andá a: https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/deployments
2. Hací clic en "..." (tres puntos) en la última versión
3. Hací clic en "Redeploy"
4. Esperá a que termine (1-2 minutos)

---

## PARTE 4: CONFIGURAR EL WEBHOOK EN META

### Paso 1: Ir a la configuración del webhook
1. Andá a: https://developers.facebook.com/apps/1649325693862297/dashboard/
2. En el menú de la izquierda, buscá "WhatsApp" o "Getting Started"
3. Si no lo encontrás, andá directamente a: https://developers.facebook.com/apps/1649325693862297/whatsapp-business/

### Paso 2: Verificar el webhook
1. En "Webhook", hací clic en "Editar"
2. Verificá que la URL sea: https://whatsapp-bot-falpat.vercel.app/api/webhook
3. Verificá que el token sea: falpat-bot-2024
4. Hací clic en "Verificar y guardar"

### Paso 3: Suscribirse a eventos
1. En "Suscribirse a eventos", seleccioná: **messages**
2. Guardá los cambios

---

## PARTE 5: PROBAR EL BOT

### Paso 1: Mandar mensaje de prueba
1. Desde tu celular personal, mandá un mensaje al número nuevo del chip
2. Escribí: "Hola, quiero saber precios"
3. Esperá 5-10 segundos
4. El bot debería responder automáticamente

### Paso 2: Verificar que funciona
- Si el bot responde: ¡Funciona!
- Si no responde: Revisá los logs en Vercel

### Paso 3: Probar horarios
- Mandá un mensaje en horario laboral (08:00-17:00): El bot NO debería responder
- Mandá un mensaje fuera de horario: El bot SÍ debería responder

---

## PARTE 6: CONFIGURAR LAS RESPUESTAS DEL BOT

### ¿El bot puede responder preguntas específicas de FALPAT?

**SÍ, se puede configurar.** El bot usa inteligencia artificial (Groq/Llama 3.3) que puede responder preguntas sobre tu negocio.

### Para configurar las respuestas:
1. Editá el archivo `src/lib/ai.ts`
2. Cambiá el SYSTEM_PROMPT con información de FALPAT
3. Hacé push a GitHub
4. Redesplegá en Vercel

### Ejemplo de SYSTEM_PROMPT personalizado:
```
Eres un asistente virtual de FALPAT, una empresa de [DESCRIBÍ TU NEGOCIO].

Servicios que ofrecemos:
- [SERVICIO 1]
- [SERVICIO 2]
- [SERVICIO 3]

Horario de atención: Lunes a viernes de 8:00 a 17:00 hs, sábados hasta 14:00 hs.

Respondé de forma amable y profesional. Si no sabés algo, decí que un representante te contactará mañana.
```

---

## PARTE 7: SOLUCIÓN DE PROBLEMAS

### Si el bot no responde:
1. Revisá los logs en Vercel: https://vercel.com/letraymusica1969-design/whatsapp-bot-falpat/logs
2. Verificá que las variables de entorno estén correctas
3. Verificá que el webhook esté configurado correctamente

### Si el token no funciona:
1. Andá a: https://business.facebook.com/settings/system-users
2. Hací clic en tu usuario
3. Hací clic en "Generar nuevo token"
4. Seleccioná la app: FALPAT Bot
5. Seleccioná permisos: whatsapp_business_messaging y whatsapp_business_management
6. Hací clic en "Generar token"
7. Copiá el token y actualizalo en Vercel

### Si el chip no tiene saldo:
- El bot funciona sin saldo para recibir mensajes
- Pero necesitás saldo para verificar el número en Meta (por SMS)

---

## PARTE 8: MONITOREO

### Verificar uso diario:
- Andá a: https://whatsapp-bot-falpat.vercel.app/api/stats
- Revisá los números de lecturas y escrituras

### Límites gratis:
- Firebase: 50,000 reads/día, 20,000 writes/día
- WhatsApp: 1,000 conversaciones/mes
- Groq: 30,000 tokens/minuto

---

## RESUMEN DE PASOS MAÑANA

1. Comprar chip prepago
2. Activar chip y anotar número
3. Instalar WhatsApp en celular viejo
4. Registrar número en Meta
5. Copiar Phone Number ID
6. Actualizar variable en Vercel
7. Redesplegar bot
8. Probar enviando mensaje desde celular personal
9. Configurar respuestas del bot (opcional)

---

## NOTAS IMPORTANTES

- El chip necesita saldo mínimo para verificar el número en Meta
- El bot funciona 24/7 pero solo responde fuera del horario laboral
- Si algo sale mal, podés volver a WhatsApp personal desde el celular en 30 días
- Protegé el número del chip — es el nuevo "número de atención al cliente"
