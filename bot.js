const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

const client = new Client();

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  console.log("QR RECEIVED");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  if (msg.body.toLowerCase() == "hi") {
    msg.reply("Hi, i'm online now 👋");
  } else if (msg.body === "!stiker" || (msg.body === "!sticker" && msg.hasMedia)) {
    const attachmentData = await msg.downloadMedia();
    client.sendMessage(msg.from, attachmentData, { sendMediaAsSticker: true, stickerAuthor: "Vioku" });
  }
});

client.initialize();
