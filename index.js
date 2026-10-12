const fs = require("fs");
const path = require("path");
const http = require("http");

const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "development";

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// API response helper
function sendJson(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  // API endpoint
  if (req.url === "/api/status") {
    sendJson(res, {
      message: "Hello from Node.js!",
      environment: nodeEnv,
      time: new Date().toISOString(),
    });

    return;
  }

  // Serve the frontend
  if (req.url === "/" || req.url === "/index.html") {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, "utf8", (error, data) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end("Could not load frontend.");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(data);
    });

    return;
  }

  // Serve CSS
  if (req.url === "/style.css") {
    const filePath = path.join(__dirname, "public", "style.css");

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("CSS not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/css",
      });

      res.end(data);
    });

    return;
  }

  // Serve JavaScript
  if (req.url === "/app.js") {
    const filePath = path.join(__dirname, "public", "app.js");

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("JavaScript not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "application/javascript",
      });

      res.end(data);
    });

    return;
  }

  // Unknown route
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });

  res.end("Not found");
});

server.listen(port, () => {
  log(`Server running at http://localhost:${port}`);
});
