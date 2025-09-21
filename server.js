export async function getMistralReply(message) {
  if (!message) {
    console.warn('No message provided');
    return "I don't know what to say";
  }

  try {
    const res = await fetch('https://api.mistral.ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      console.error('API returned non-200 status:', res.status);
      return "I don't know what to say";
    }

    const data = await res.json();
    console.log('API response:', data);
    return data.reply || "I don't know what to say";
  } catch (err) {
    console.error('Error calling Mistral:', err);
    return "I don't know what to say";
  }
}
