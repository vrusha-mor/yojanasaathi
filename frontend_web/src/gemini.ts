import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const getGeminiResponse = async (prompt: string, history: any[] = []) => {
    if (!genAI) {
        console.error("Gemini API Key is missing");
        return { text: "Error: API Key missing in .env", json: null };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Convert history to Gemini format (user/model) if needed, 
        // for this simple implementation we might just append previous context to prompt or use chatSession
        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'citizen' ? 'user' : 'model',
                parts: [{ text: h.content }]
            }))
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        // Try to parse JSON if the model provided it
        let json = null;
        try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                json = JSON.parse(jsonMatch[0]);
            }
        } catch (e) {
            console.warn("Failed to parse JSON from Gemini response", e);
        }

        return { text, json };
    } catch (error) {
        console.error("Gemini interaction failed", error);
        throw error;
    }
};

export const classifyScam = async (message: string, languageName: string = "English") => {
    if (!genAI) return { classification: "Unknown", reason: "API Key missing" };

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analyze this message and classify it as "Genuine", "Suspicious", or "Fake". Provide a short reason in ${languageName} language.
    Message: "${message}"
    Return JSON format: { "classification": "...", "reason": "..." }`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        return { classification: "Unknown", reason: "Could not parse response" };
    } catch (e) {
        return { classification: "Error", reason: "Service unavailable" };
    }
}
