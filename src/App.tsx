import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/search=${searchTerm}`
      );
      const data = await response.text();

      let bodyContent = data.split("\r\n\r\n")[1];
      bodyContent = bodyContent
        .replace(/(\r\n)?[0-9a-fA-F]+\r\n/g, "")
        .slice(0, -1);

      setContent(bodyContent);
    } catch (error) {
      console.error("Error fetching HTML:", error);
      setContent("Failed to fetch content.");
    }
  };

  const handleRefresh = () => {
    // 검색어 및 콘텐츠 초기화
    setSearchTerm("");
    setContent("");
  };

  return (
    <>
      <div
        className={`w-full flex flex-col p-4 fixed ${
          content ? "bottom-0 right-0 items-end" : "items-center absolute top-0"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Google Search Interface
        </h1>
        <div className="flex w-full max-w-md gap-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term"
            className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}

export default App;
