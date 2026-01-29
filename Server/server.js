const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket logic
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    // Broadcast message to ALL clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

// Start server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
