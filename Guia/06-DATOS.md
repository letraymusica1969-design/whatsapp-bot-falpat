# 06 — Estado de los Datos

Situación actual de la base de datos y cómo manejar los datos.

---

## Estado actual

| Colección | Documentos | Notas |
|-----------|------------|-------|
| conversations | 12 | Historial de chats con clientes |
| config/bot | 1 | Configuración del bot |
| pendingCalls | 7 | Clientes que escribieron fuera de horario |
| stats | variable | Estadísticas diarias de uso |

---

## Colecciones detalladas

### conversations (12 docs)

Historial de conversaciones de WhatsApp con clientes.
Cada documento tiene el teléfono como ID y contiene los últimos 20 mensajes.

No hay script de reset — se limpian manualmente desde Firebase Console o cuando se cambia el número de WhatsApp.

### config/bot (1 doc)

Configuración central del bot:
- Horarios de atención
- Base de conocimiento (empresa, servicios, productos, FAQ)
- Timezone

Este documento es editable desde el admin panel sin redeploy.

### pendingCalls (7 docs)

Clientes que escribieron fuera de horario laboral.
Se crean automáticamente cuando el bot detecta un mensaje fuera de horario.
Se pueden marcar como "llamado" o "descartado" desde el admin panel `/ventas`.

### stats

Estadísticas de uso de Firebase (lecturas, escrituras, mensajes).
Un documento por día con formato `YYYY-MM-DD`.

---

## Backup

### Desde el admin panel

Ir a https://whatsapp-bot-falpat.vercel.app/admin?key=falpat-stats-2024
Pestaña "Conversations" → Exportar datos.

### Desde Firebase Console

1. Ir a https://console.firebase.google.com/project/falpat-bot
2. Firestore Database → Exportar

---

## Restore

### Desde Firebase Console

1. Ir a https://console.firebase.google.com/project/falpat-bot
2. Firestore Database → Importar
3. Seleccionar el archivo de backup

### Reset manual

Para limpiar las conversaciones de prueba:
1. Ir a Firebase Console → Firestore
2. Eliminar la colección `conversations`
3. Eliminar la colección `pendingCalls`
4. **NO eliminar** `config/bot` (contiene la configuración del bot)

---

## Datos de prueba actuales

Los 7 pendingCalls son datos de prueba generados a partir de conversaciones existentes.
Se pueden eliminar sin problema cuando se conecte el número de WhatsApp real.
