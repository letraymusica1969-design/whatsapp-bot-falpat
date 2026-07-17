# 01 — Setup PC Nueva

Cómo dejar el proyecto funcionando exactamente igual que en la PC original.

---

## Requisitos previos

Instalar en la PC nueva:

| Software | Versión | Descargar |
|----------|---------|-----------|
| Node.js | 18 o superior | https://nodejs.org/ |
| Git | cualquier versión | https://git-scm.com/ |
| Chrome o Edge | última | https://www.google.com/chrome/ |
| VS Code (opcional) | última | https://code.visualstudio.com/ |

---

## Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/letraymusica1969-design/whatsapp-bot-falpat.git
cd whatsapp-bot-falpat
```

---

## Paso 2 — Copiar los archivos de credenciales

Copiar la carpeta **completa** de la PC original a la PC nueva (por USB):

```
PC original:
  📁 whatsapp-bot-falpat/Guia/    ← todo, incluyendo confidencial/

PC nueva:
  📁 whatsapp-bot-falpat/Guia/
```

O manualmente, copiar este **1 archivo**:

```
Guia/confidencial/.env.local   →  whatsapp-bot-falpat/.env.local
```

⚠️ **Este archivo NO está en GitHub** porque contiene secretos.
Sin él, el bot no puede conectarse a Firebase ni responder por WhatsApp.

---

## Paso 3 — Instalar dependencias

```bash
npm install
```

---

## Paso 4 — ¡A trabajar!

```bash
npm run dev        # http://localhost:3000
npm run build      # Build de producción
```

---

## Setup automático

En PowerShell, parado en la carpeta `whatsapp-bot-falpat`:

```powershell
.\scripts\setup-nueva-pc.ps1
```

Hace los pasos 1, 3 y 4 automáticamente y te guía con las credenciales.

---

## Alternativa: solo usar la app (sin instalar nada)

Si no necesitás modificar el código, directamente:

- Admin: https://whatsapp-bot-falpat.vercel.app/admin?key=falpat-stats-2024
- Ventas: https://whatsapp-bot-falpat.vercel.app/ventas
- Manual: https://whatsapp-bot-falpat.vercel.app/manual
