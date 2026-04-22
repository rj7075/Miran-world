import { useState } from "react";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/userquery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const scale = (val) => val * 50;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 w-full max-w-2xl">
        
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
          Drawing AI
        </h1>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter drawing instruction..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        {/* Drawing Area */}
        <div className="mt-6 border rounded-xl p-2 sm:p-4 bg-gray-50 flex justify-center overflow-x-auto">
          <svg
            viewBox="0 0 300 300"
            className="w-full max-w-[300px] h-auto"
          >
            {result?.shapes?.map((shape, i) => {

              if (shape.type === "triangle") {
                const points = shape.points
                  .map(([x, y]) => `${scale(x)},${300 - scale(y)}`)
                  .join(" ");

                return (
                  <polygon
                    key={i}
                    points={points}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />
                );
              }

              if (shape.type === "circle") {
                return (
                  <circle
                    key={i}
                    cx={scale(shape.center[0])}
                    cy={300 - scale(shape.center[1])}
                    r={scale(shape.radius)}
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                  />
                );
              }

              return null;
            })}
          </svg>
        </div>

        {/* JSON Output */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-sm sm:text-base">
            Output JSON:
          </h3>

          <pre className="bg-black text-green-400 p-3 rounded-lg text-xs sm:text-sm overflow-x-auto max-h-60">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
}

export default App;