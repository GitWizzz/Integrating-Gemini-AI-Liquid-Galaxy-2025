import { Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import GeminiChat from "./components/GeminiChat";
import GeminiImageAnalyzer from "./components/GeminiImage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<GeminiChat />} />
      <Route path="/image" element={<GeminiImageAnalyzer />} />
    </Routes>
  );
}

export default App;
