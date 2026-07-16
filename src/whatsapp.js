const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "./sessions" }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

let isReady = false;

client.on("qr", (qr) => {
  console.log("Escaneá este QR con tu WhatsApp:");
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("Autenticado correctamente");
});

client.on("ready", () => {
  isReady = true;
  console.log("Bot de WhatsApp listo!");
});

client.on("disconnected", (reason) => {
  isReady = false;
  console.log("Desconectado:", reason);
});

function isClientReady() {
  return isReady;
}

async function sendMessage(phone, message) {
  try {
    const chatId = phone + "@c.us";
    await client.sendMessage(chatId, message);
    return true;
  } catch (error) {
    console.error("Error enviando mensaje:", error);
    return false;
  }
}

module.exports = { client, isClientReady, sendMessage };
