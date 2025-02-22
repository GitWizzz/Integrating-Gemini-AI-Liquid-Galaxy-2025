import GeminiChat from "./components/GeminiChat";
import GeminiImageAnalyzer from "./components/GeminiImage";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Gemini AI Chat</h1>
      {/* <GeminiChat /> */}
      <GeminiImageAnalyzer/>
    </div>
  );
}
export default App;
