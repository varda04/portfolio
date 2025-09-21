// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
  if (!MISTRAL_API_KEY) {
    console.error("❌ No MISTRAL_API_KEY found in environment");
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Mistral API error ${response.status}: ${text}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Error in /api/chat:", err);
    res.status(500).json({ error: err.message });
  }
}
