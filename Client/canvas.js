const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const thicknessSlider = document.getElementById("thickness");
const themeToggle = document.getElementById("themeToggle");

let drawing = false;

// Mouse down -> start line
canvas.addEventListener("mousedown", (e) => {
  drawing = true;

  socket.send(JSON.stringify({
    type: "START",
    x: e.offsetX,
    y: e.offsetY,
    color: colorPicker.value,
    width: thicknessSlider.value
  }));
});

// Mouse move -> draw line
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  socket.send(JSON.stringify({
    type: "DRAW",
    x: e.offsetX,
    y: e.offsetY
  }));
});

// Mouse up -> stop drawing
canvas.addEventListener("mouseup", () => {
  drawing = false;
});

// Light / Dark toggle (local only)
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
