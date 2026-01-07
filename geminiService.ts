import { GoogleGenAI } from "@google/genai";
import { BIO_CONTEXT } from "./constants";

export class GeminiService {
  async askDaniel(question: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: question,
        config: {
          systemInstruction: BIO_CONTEXT,
          temperature: 0.7,
        },
      });

      return response.text || "Lo siento, no pude encontrar esa información en mis mapas.";
    } catch (error: any) {
      console.error("Error en GeminiService:", error);
      return "¡Tierra a la vista! Pero tenemos un pequeño problema de conexión con el asistente. ¿Podrías intentar preguntarme de nuevo?";
    }
  }
}

export const geminiService = new GeminiService();
