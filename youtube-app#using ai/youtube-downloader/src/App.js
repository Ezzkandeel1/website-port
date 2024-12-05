import React, { useState } from "react";
import './App.css';  // Import the CSS file

function App() {
  const [url, setUrl] = useState("");
  const [resolution, setResolution] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setError(""); // Reset errors
    try {
      const response = await fetch("http://localhost:5000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, resolution }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download the video.");
      }

      // Convert the response to a blob and download
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "video.mp4"; // Name of the downloaded file
      link.click();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>YouTube Video Downloader</h1>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter resolution (e.g., 720)"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="input-field"
        />
        <button onClick={handleDownload} className="download-button">Download Video</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default App;
