// index.js

const fs = require("fs");
const path = require("path");
const http = require("http");

// 1. Basic HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node.js!");
});

// 2. Read a file
function readFile(fileName) {
  try {
    const filePath = path.join(__dirname, fileName);
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Could not read file:", error.message);
    return null;
  }
}

// 3. Write to a file
function writeFile(fileName, content) {
  try {
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Wrote to ${fileName}`);
  } catch (error) {
    console.error("Could not write file:", error.message);
  }
}

// 4. Append to a file
function appendToFile(fileName, content) {
  fs.appendFileSync(
    path.join(__dirname, fileName),
    content + "\n",
    "utf8"
  );
}

// 5. Get environment variables
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "development";

console.log("Environment:", nodeEnv);

// 6. Simple logger with timestamps
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

log("Application starting...");

// 7. Generate a random ID
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

console.log("Random ID:", generateId());

// 8. Check whether a file exists
function fileExists(fileName) {
  return fs.existsSync(path.join(__dirname, fileName));
}

console.log("index.js exists:", fileExists("index.js"));

// 9. Get command-line arguments
const args = process.argv.slice(2);

console.log("Arguments:", args);

// Example:
// node index.js hello world
// args => ["hello", "world"]

// 10. Graceful shutdown
process.on("SIGINT", () => {
  log("Shutting down...");

  server.close(() => {
    log("Server stopped.");
    process.exit(0);
  });
});

// Start the server
server.listen(port, () => {
  log(`Server running at http://localhost:${port}`);
});
