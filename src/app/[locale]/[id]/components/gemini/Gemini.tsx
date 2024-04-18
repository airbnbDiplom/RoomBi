import { GoogleGenerativeAI } from "@google/generative-ai";
import { getKey } from "@/app/services/gemeniService";
export async function fetchDataFromGeminiAPI(promt: string) {
  const API_KEY = await getKey();
  let genAI;
  let model;
  if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
  }
  if (model) {
    try {
      const result = await model.generateContent(promt);
      const response = result.response;
      const text = response.text();
      return text;
    } catch (ex) {
      console.error("fetchDataFromGeminiAPI error-", ex);
      return "Ваше розташування  не підтримується для використання даної функції (використайте VPN)";
    }
  }
}
