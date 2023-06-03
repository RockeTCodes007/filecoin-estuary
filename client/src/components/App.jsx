import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file for styling

const API_KEY = <YOUR_ESTUARY_API_KEY>;

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploadedData, setUploadedData] = useState(null);

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

    setStatus("Please wait uploading...");

    axios
      .post("http://localhost:5000/api", form, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setStatus("File uploaded successfully.");
        setUploadedData(response.data); // Set the uploaded data
      })
      .catch(function (error) {
        setStatus("Error uploading file.Please try again later.");
      });
  };

  return (
    <div className="upload-container">
      <h1>File Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
      {uploadedData && (
        <div>
          <p>
            Click{" "}
            <a
              href={uploadedData.estuary_retrieval_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{" "}
            to view the file.
          </p>
        </div>
      )}
      <h2 className="animated-text">Welcome to the Filecoin Uploader!</h2>
    </div>
  );
}

export default App;
