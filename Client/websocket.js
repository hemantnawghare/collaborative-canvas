// const socket = new WebSocket("ws://localhost:3000");

const socket = new WebSocket(
  location.protocol === "https:"
    ? `wss://${location.host}`
    : `ws://${location.host}`
);


socket.onopen = () => {
  console.log("WebSocket connected");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "START") {
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);
    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.width; 
  }

  if (data.type === "DRAW") {
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
  }
};
