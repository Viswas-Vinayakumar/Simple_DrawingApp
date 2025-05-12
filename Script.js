const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = bgColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;
let drawMode = true;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const bgColorPicker = document.getElementById('bgColorPicker');

colorPicker.addEventListener('input', () => {
  ctx.strokeStyle = colorPicker.value;
});

brushSize.addEventListener('input', () => {
  ctx.lineWidth = brushSize.value;
});

bgColorPicker.addEventListener('input', () => {
  ctx.fillStyle = bgColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function startDrawing(e) {
  e.preventDefault();
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.touches ? e.touches[0].clientX : e.offsetX, e.touches ? e.touches[0].clientY : e.offsetY);
}

function draw(e) {
  e.preventDefault();
  if (!isDrawing) return;
  ctx.lineCap = 'round';
  ctx.strokeStyle = drawMode ? colorPicker.value : '#ffffff';
  ctx.lineTo(e.touches ? e.touches[0].clientX : e.offsetX, e.touches ? e.touches[0].clientY : e.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('drawBtn').addEventListener('click', () => {
  drawMode = true;
});

document.getElementById('eraseBtn').addEventListener('click', () => {
  drawMode = false;
});

document.getElementById('clearBtn').addEventListener('click', () => {
  clearCanvas();
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});
