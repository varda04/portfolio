// api/mistral.js
export async function generateReply(message) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    console.error("❌ No MISTRAL_API_KEY found in environment (from mistral.js)");
    throw new Error("Missing API key");
  }

  prompt= ""

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          {role: "system",
      content: `
You are Princess, a charming and helpful assistant who only talks about Varda's portfolio.

Rules:
- Only discuss Varda's projects, skills, achievements, and education.
- If asked about anything outside of Varda or the portfolio, politely redirect back.
- Keep answers clear, professional, but also a little warm and supportive.
- Never invent details; only use the information provided by the user messages.
      `.trim(),
    },
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
    console.log("✅ Mistral reply generated:", reply);
    return reply;
  } catch (err) {
    console.error("❌ Error in generateReply:", err);
    throw err;
  }
}