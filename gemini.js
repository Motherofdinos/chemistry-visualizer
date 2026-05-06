const MODEL = 'gemini-3.1-flash-lite-preview';
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

    let res;
    try {
        res = await fetch(`${API_URL}?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
            })
        });
    } catch (networkErr) {
        console.error('Fetch failed (мережа/CORS):', networkErr);
        throw new Error('NETWORK');
    }

    const body = await res.text();
    console.log('Gemini status:', res.status);
    console.log('Gemini body:', body.slice(0, 500));

    if (res.status === 400 || res.status === 403) throw new Error('BAD_KEY');
    if (res.status === 429) throw new Error('RATE_LIMIT');
    if (!res.ok) throw new Error('API_ERROR ' + res.status);

    return JSON.parse(body)?.candidates?.[0]?.content?.parts?.[0]?.text ?? '—';

}
