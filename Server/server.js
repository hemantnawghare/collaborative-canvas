const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// SERVE CLIENT FILES
const clientPath = path.join(__dirname, "../Client");
app.use(express.static(clientPath));

// SERVE index.html on "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// WebSocket logic
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

//Railway dynamic port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
