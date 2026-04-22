import { useState } from 'react'
import './index.css'

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:8000/userquery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    setResult(data);
  };

  const scale = (val) => val * 50;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl">
        
        <h1 className="text-2xl font-bold text-center mb-4">
           Drawing AI
        </h1>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter drawing instruction..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>

        {/* Drawing Area */}
        <div className="mt-6 border rounded-xl p-4 bg-gray-50 flex justify-center">
          <svg width="300" height="300">
            {result?.shapes?.map((shape, i) => {
              
              // 🔺 Triangle
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

              // ⚪ Circle
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
          <h3 className="font-semibold mb-2">Output JSON:</h3>
          <pre className="bg-black text-green-400 p-3 rounded-lg text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
}

export default App;