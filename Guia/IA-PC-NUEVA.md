# INSTRUCCIONES PARA LA IA (openCode)

Pegá esto COMPLETO como primer mensaje cuando abras la IA en la PC nueva:

---

ESTAMOS EN UNA PC NUEVA. Tenemos un USB con las credenciales.

1. Primero preguntame qué letra tiene el USB (D:, E:, F:, etc.)
2. Cloná el repo: `git clone https://github.com/letraymusica1969-design/whatsapp-bot-falpat.git C:\Bot`
3. Copiá las credenciales:
   - `{USB}:\Guia\confidencial\.env.local` → `C:\Bot\.env.local`
4. Verificá que Node.js esté instalado con `node --version`. Si no está, decime que lo descargue de https://nodejs.org/
5. Ejecutá `cd C:\Bot && npm install`
6. Ejecutá `npm run dev`
7. Decime que abra `http://localhost:3000` en el navegador
8. Verificar que el webhook funcione: `curl http://localhost:3000/api/webhook?hub.mode=subscribe&hub.verify_token=falpat-bot-2024&hub.challenge=test123`
9. Opcional: `npm run build` para verificar que compila
