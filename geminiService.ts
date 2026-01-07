import { GoogleGenAI } from "@google/genai";
import { BIO_CONTEXT } from "../constants";

export class GeminiService {
  async askDaniel(question: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: question,
        config: {
          systemInstruction: BIO_CONTEXT,
          temperature: 0.7,
        },
      });

      return response.text || "Lo siento, no pude procesar tu duda geográfica ahora.";
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return "¡Ups! Mi mapa mental se desactualizó un momento. ¿Podrías repetir la pregunta?";
    }
  }
}

export const geminiService = new GeminiService();