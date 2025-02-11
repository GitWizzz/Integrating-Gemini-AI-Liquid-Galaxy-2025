import { useState } from "react";
import { uploadImage } from "../utils/image";

const GeminiImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setAnalysisResult("");

    try {
      const result = await uploadImage(image);
      setAnalysisResult(result);
    } catch (error) {
      setAnalysisResult("Failed to analyze image.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Gemini Image Analyzer</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2 p-2 border rounded"
      />

      {image && (
        <div className="mb-2">
          <img src={URL.createObjectURL(image)} alt="Uploaded" className="max-w-full h-auto rounded"/>
        </div>
      )}

      <button onClick={handleAnalyze} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {analysisResult && (
        <div className="mt-4 p-2 bg-white rounded shadow">
          <h3 className="font-semibold">Analysis Result:</h3>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiImageAnalyzer;
