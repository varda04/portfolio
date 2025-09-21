// api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message missing' });
  }

  try {
    // Call Mistral API
    const apiKey = process.env.MISTRAL_API_KEY;
    const response = await fetch('https://api.mistral.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'Magistral-small',
        input: message,
        max_new_tokens: 200,
      }),
    });

    const data = await response.json();

    // The exact path to the generated text depends on Mistral response format
    const reply = data.output?.[0]?.content || "Hmm... I don't know what to say.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Mistral API error:', err);
    res.status(500).json({ error: 'Failed to get response from Mistral API' });
  }
}
