// api/mistral.js
export async function generateReply(message) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    console.error("❌ No MISTRAL_API_KEY found in environment (from mistral.js)");
    throw new Error("Missing API key");
  }

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
    console.log("✅ Mistral reply generated:", reply);
    return reply;
  } catch (err) {
    console.error("❌ Error in generateReply:", err);
    throw err;
  }
}
