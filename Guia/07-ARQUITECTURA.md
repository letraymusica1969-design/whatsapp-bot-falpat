# 07 — Arquitectura

Cómo está construida la aplicación.

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Framework | Next.js | 14.2 |
| Lenguaje | TypeScript | 5.x |
| AI | Groq (Llama 3.3 70B) | — |
| Base de datos | Firebase Firestore | Admin SDK v12 |
| Hosting | Vercel | — |
| Mensajería | WhatsApp Business API | Cloud API |
| Control de versiones | Git + GitHub | — |

---

## Estructura del proyecto (carpetas principales)

```
whatsapp-bot-falpat/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (hero +Cómo funciona)
│   │   ├── layout.tsx            # Layout raíz (background #000)
│   │   ├── admin/page.tsx        # Panel de administración
│   │   ├── ventas/page.tsx       # Lista de llamadas pendientes (público)
│   │   ├── manual/page.tsx       # Manual operativo + técnico
│   │   └── api/
│   │       ├── webhook/route.ts  # Webhook WhatsApp (GET + POST)
│   │       ├── conversations/route.ts # GET conversaciones
│   │       ├── config/route.ts   # GET/POST configuración
│   │       ├── pending-calls/route.ts # GET/PATCH/POST llamadas
│   │       └── stats/route.ts    # GET estadísticas
│   └── lib/
│       ├── ai.ts                 # Groq LLM + system prompt dinámico
│       ├── firebase.ts           # Firebase Admin SDK
│       ├── whatsapp.ts           # WhatsApp Business API client
│       ├── monitor.ts            # Tracking de uso
│       └── types.ts              # Tipos TypeScript
├── Guia/                         # Esta documentación
├── .env.local                    # Secretos (NO en git)
├── package.json
├── next.config.js
├── tsconfig.json
└── tailwind.config.ts
```

---

## Flujo de mensajes

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Cliente WhatsApp │────▶│  Meta Cloud API  │────▶│  Vercel Webhook  │
│                  │◀────│                  │◀────│  /api/webhook    │
└─────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                          │
                                          ┌───────────────▼───────────────┐
                                          │  1. Verificar firma           │
                                          │  2. Parsear mensaje           │
                                          │  3. Leer config de Firebase   │
                                          │  4. Armar system prompt       │
                                          │  5. Buscar historial          │
                                          │  6. Enviar a Groq AI          │
                                          │  7. Guardar conversación      │
                                          │  8. Si fuera de horario:      │
                                          │     - Agregar nota al pie     │
                                          │     - Guardar en pendingCalls │
                                          │  9. Responder por WhatsApp    │
                                          └───────────────────────────────┘
```

---

## System Prompt Dinámico

El system prompt se construye desde Firebase (`config/bot`) con 60 segundos de cache:

1. Datos de la empresa (nombre, dirección, teléfono)
2. Productos y servicios
3. Horarios de atención
4. FAQ (frecuencia, unidad de medida, entrega, etc.)
5. Reglas de comportamiento (no inventar precios, ser amable, etc.)

Si Firebase no está disponible, usa un prompt de fallback.

---

## Horario del bot

| Día | Horario del bot | Horario humano |
|-----|-----------------|----------------|
| Lunes a Viernes | 17:00 - 08:00 | 08:00 - 17:00 |
| Sábado | 14:00 - 00:00 | 08:00 - 14:00 |
| Domingo | Todo el día | No hay atención |

- **Dentro de horario del bot:** Responde normalmente
- **Fuera de horario del bot:** Responde + agrega nota + guarda en pendingCalls

---

## Admin Panel

El admin panel (`/admin`) tiene 3 pestañas:

| Pestaña | Función |
|---------|---------|
| Conversaciones | Ver historial de chats, buscar por teléfono |
| Knowledge Base | Editar empresa, servicios, productos, FAQ |
| Settings | Configurar horarios, ver estadísticas |

Autenticación: Basic Auth (ADMIN/123456) + API key en URL.

---

## Página de Ventas

La página `/ventas` es **pública** — no requiere autenticación.
Muestra los clientes que escribieron fuera de horario laboral.

Funcionalidades:
- Estadísticas (pendientes, llamados, descartados, total)
- Filtros por estado
- Tarjetas expandibles con detalles del mensaje
- Botón "Responder por WhatsApp" (abre wa.me/{phone})

---

## Deploy

Cada `git push` a `main` → Vercel build automático → producción actualizada.
