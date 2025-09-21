const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

async function getMistralReply(message) {
  const url = 'https://api.mistral.ai/v1/chat/completions';

  const payload = {
    model: "mistral-small",   // correct model name
    messages: [
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

  // Correct way to get text reply
  return data.choices?.[0]?.message?.content || "Hmm... I have no idea.";
}

module.exports = { getMistralReply };
