const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

export async function getMistralReply(message) {
  const url = 'https://api.mistral.ai/v1/chat/completions';

  const payload = {
    model: "mistral-small-latest",   // works (you tested with curl!)
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: message }
    ]
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MISTRAL_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Mistral API error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  console.log("Mistral raw response:", data);

  // ✅ This now matches the JSON you saw from curl
  return data.choices?.[0]?.message?.content || "Hmm... I have no idea.";
}
