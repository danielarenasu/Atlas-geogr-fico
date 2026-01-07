import { GoogleGenAI } from "@google/genai";
import { BIO_CONTEXT } from "../constants";

export class GeminiService {
  async askDaniel(question: string) {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        return "Error: No se ha configurado la API_KEY en el entorno.";
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: question,
        config: {
          systemInstruction: BIO_CONTEXT,
          temperature: 0.7,
        },
      });

      return response.text || "Lo siento, no tengo una respuesta clara para eso.";
    } catch (error: any) {
      console.error("Error en GeminiService:", error);
      if (error.message?.includes("entity was not found")) {
        return "Error de configuración de la API. Verifica tu clave de Google AI Studio.";
      }
      return "¡Ups! No pude conectar con el asistente. Revisa la consola para más detalles.";
    }
  }
}

export const geminiService = new GeminiService();