// api/chat.js
import { generateReply } from './mistral.js';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.error("❌ Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    console.error("❌ Message missing in request body");
    return res.status(400).json({ error: "Message missing" });
  }

  try {
    console.log("➡️ Received message:", message);
    const reply = await generateReply(message);
    console.log("⬅️ Sending reply:", reply);
    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Error in /api/chat handler:", err);
    res.status(500).json({ error: err.message });
  }
}