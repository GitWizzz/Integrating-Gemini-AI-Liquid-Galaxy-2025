import { GoogleGenerativeAI } from "@google/generative-ai";

/* ---------- response cleaner ---------- */
const cleanResponse=(text)=>{
  return text
    .replace(/###\s?/g,"\n\n")
    .replace(/\*\*(.*?)\*\*/g,"$1")
    .replace(/\n{3,}/g,"\n\n")
    .replace(/^\s*[-*]\s?/gm,"• ")
    .replace(/^\s*\d+\.\s?/gm,"• ")
    .trim();
};

/* ---------- main function ---------- */
export const getGeminiResponse=async(message)=>{
  try{
    const userKey=localStorage.getItem("GEMINI_API_KEY");
    const API_KEY=userKey || import.meta.env.VITE_GEMINI_API_KEY;

    if(!API_KEY) return "No API key found. Please add one in settings.";

    const genAI=new GoogleGenerativeAI(API_KEY);
    const model=genAI.getGenerativeModel({ model:"gemini-2.5-flash" });

    const result=await model.generateContent(message);
    const text=result.response.text();

    return cleanResponse(text);
  }catch(err){
    console.error("Gemini error:",err);
    return "Unable to generate a response right now. Please try again.";
  }
};
