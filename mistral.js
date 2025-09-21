// const fetch = require('node-fetch');  <- remove this

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

async function getMistralReply(message) {
    const url = 'https://api.mistral.ai/v1/generate'; // adjust if needed

    const payload = {
        model: "Magistral-small",
        input: message
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
    return data.output || "Hmm... I have no idea.";
}

module.exports = { getMistralReply };