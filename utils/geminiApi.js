import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC_6z96oR53D0HbhGJT5NOwy8PsSC1Zf6w");

export async function getGeminiResponse(prompt, isSimple = false) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const enhancedPrompt = isSimple
      ? `Explain this in simple terms that a 5-year-old could understand: ${prompt}`
      : prompt;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}
