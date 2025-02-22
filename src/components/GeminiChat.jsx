import { useState } from "react";
import { getGeminiResponse } from "../utils/text";

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setConversation((prev) => [...prev, userMessage]);

    const aiResponse = await getGeminiResponse(input);

    const aiMessage = { role: "assistant", content: aiResponse };
    setConversation((prev) => [...prev, aiMessage]);

    setInput("");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Ask Gemini AI</h2>

      <div className="h-full overflow-y-auto p-2 bg-white rounded shadow">
        {conversation.map((msg, index) => (
          <div key={index} className={`p-1 ${msg.role === "user" ? "text-blue-600" : "text-gray-800"}`}>
            <strong>{msg.role === "user" ? "You:" : "Gemini:"}</strong>
            <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, "<br>") }} />
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full p-2 border rounded mt-2" placeholder="Type your question..."/>

      <button onClick={handleGenerate} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Get Response
      </button>
      
    </div>
  );
};

export default GeminiChat;
