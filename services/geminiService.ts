import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const fetchGreekSummerFact = async (): Promise<string> => {
  if (!apiKey) {
    return "Please configure your API_KEY to see AI-generated Greek facts!";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Tell me a short, fascinating, and culturally rich fact about Greek Summer, the Aegean Sea, or Greek Islands. It should be one or two sentences max. Make it sound inviting and magical.",
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for simple text generation to reduce latency
      }
    });

    return response.text || "Greece is waiting for you!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Oracle is silent right now. Check back later!";
  }
};
