const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// Define the proxy route
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://upload.estuary.tech",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/content/add", // Modify the path as needed
    },
  })
);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
