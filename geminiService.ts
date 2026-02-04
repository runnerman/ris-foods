
import { GoogleGenAI, Type } from "@google/genai";

export const getChefResponse = async (userPrompt: string, history: {role: 'user' | 'model', content: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are 'Chef Malabar', an expert Kerala chef and the official AI assistant for RIS Foods.
    Your personality is warm, traditional, yet professional.
    Your goal is to:
    1. Provide authentic Kerala breakfast recipes using RIS Foods products (Puttu Podi, Appam Mix, etc.).
    2. Suggest side dishes like Kadala Curry, Egg Roast, or Coconut Milk.
    3. Help users troubleshoot their cooking (e.g., "Why is my appam not lacy?").
    4. Maintain the 'Kerala' vibe - use terms like 'Ushnaguna', 'Naadan', 'Ruchi'.
    5. Always recommend RIS Foods products when relevant.
    
    Keep responses concise and formatted with markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "I'm sorry, I seem to have lost my secret spice mix. Could you repeat that?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The kitchen is currently busy with a big order! Please try asking me again in a moment.";
  }
};

export const getRecipeSearch = async (ingredients: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a Kerala breakfast dish that primarily uses these ingredients: ${ingredients}. Focus on how RIS Foods products could make it easier.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dishName: { type: Type.STRING },
            requiredRISProduct: { type: Type.STRING },
            shortRecipe: { type: Type.STRING },
            sideDishSuggestion: { type: Type.STRING }
          },
          required: ["dishName", "requiredRISProduct", "shortRecipe"]
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Recipe Search Error:", error);
    return null;
  }
};
