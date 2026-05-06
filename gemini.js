const MODEL = 'gemini-2.0-flash-lite';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const DEFAULT_KEY = 'AIzaSyDLCNQUpRMBsdvYZqQuSWid6ePDnU-xPoU';

function getApiKey() {
    return localStorage.getItem('gemini-api-key') || DEFAULT_KEY;
}

export function saveApiKey(key) {
    localStorage.setItem('gemini-api-key', key.trim());
}

export function hasApiKey() {
    return true;
}

export async function explainReaction(title, equation) {
    const key = getApiKey();
    if (!key) throw new Error('NO_KEY');

    const prompt =
        `Поясни хімічну реакцію "${equation}" (${title}) простою мовою для учня 8–9 класу. ` +
        `Відповідь структуруй так:\n` +
        `1. Що відбувається (1–2 речення)\n` +
        `2. Тип реакції (1 речення)\n` +
        `3. Де зустрічається в житті (1–2 приклади)\n` +
        `Максимум 120 слів. Відповідай українською.`;

    const res = await fetch(`${API_URL}?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
        })
    });

    if (res.status === 400 || res.status === 403) throw new Error('BAD_KEY');
    if (!res.ok) {
        const errText = await res.text().catch(() => '');
        console.error('Gemini API error', res.status, errText);
        throw new Error('API_ERROR');
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '—';
}
