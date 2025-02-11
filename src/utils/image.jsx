import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 

/**
 @param {File} imageFile
 @returns {Promise<string>} 
 */

export const uploadImage = async (imageFile) => {
  try {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.readAsDataURL(imageFile);

      reader.onload = async () => {
        const base64Data = reader.result.split(",")[1]; 

        const requestPayload = {
          contents: [
            {
              role: "user",
              parts: [
                { text: "Identify and list all objects in this image:" },
                {
                  inlineData: {
                    mimeType: imageFile.type,
                    data: base64Data, 
                  },
                },
              ],
            },
          ],
        };

        try {
          const result = await model.generateContent(requestPayload);
          const response = await result.response.text();
          resolve(response);
        } catch (error) {
          console.error("Gemini API error:", error);
          reject("Error analyzing image.");
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        reject("Error reading image file.");
      };
    });
  } catch (error) {
    console.error("Error uploading image to Gemini:", error);
    return "Error analyzing image.";
  }
};
