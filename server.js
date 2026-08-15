/* eslint-disable */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".m4a": "audio/mp4",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
  ".json": "application/json",
};

const server = http.createServer((req, res) => {
  // Decode URL and sanitize
  const safeUrl = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(__dirname, safeUrl === "/" ? "index.html" : safeUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "index.html"), (error, fallback) => {
          if (error) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(fallback, "utf-8");
          }
        });
      } else {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000",
      });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
