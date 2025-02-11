import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getGeminiResponse = async (userMessage) => {
  try {
    const Payload = {
      contents: [{ parts: [{ text: userMessage }] }]
    };

    const result = await model.generateContent(Payload);
    let Text = result.response.text().trim(); 

    Text = Text
      .replace(/\n\s*\n/g, "\n\n- ")
      .replace(/([.!?])\s*\n/g, "$1<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    return Text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error fetching AI response.";
  }
};
