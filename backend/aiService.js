import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callOpenRouter(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Optional, for OpenRouter rankings
        "X-Title": "YojanaSaathi", // Optional
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001", // Or any other suitable model
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      console.error("OpenRouter Error:", data);
      throw new Error("Invalid response from OpenRouter");
    }

    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}
