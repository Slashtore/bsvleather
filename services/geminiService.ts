import { GoogleGenAI, Chat } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing via process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initializeChat = async (): Promise<void> => {
  try {
    const ai = getAiClient();
    chatSession = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Failed to initialize chat session:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
      await initializeChat();
  }
  
  if (!chatSession) {
      return "Извините, сервис временно недоступен. Пожалуйста, попробуйте позже.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Извините, я не смог сформировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    chatSession = null;
    return "Произошла ошибка связи. Пожалуйста, попробуйте еще раз.";
  }
};