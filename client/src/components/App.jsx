import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file for styling

const API_KEY = "ESTb42b4212-2d90-4fe4-b9cd-668c21bde132ARY";

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const form = new FormData();
    form.append("data", file);

    setStatus("Uploading...");

    axios
      .post("http://localhost:5000/api", form, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setStatus("File uploaded successfully.");
      })
      .catch(function (error) {
        setStatus("Error uploading file.");
      });
  };

  return (
    <div className="upload-container">
      <h1>File Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
      <h2 className="animated-text">Welcome to the Filecoin Uploader!</h2>
    </div>
  );
}

export default App;
