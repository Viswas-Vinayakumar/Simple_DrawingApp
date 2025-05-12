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

function getEventPos(e) {
  return {
    x: e.touches ? e.touches[0].clientX : e.offsetX,
    y: e.touches ? e.touches[0].clientY : e.offsetY
  };
}

function startDrawing(e) {
  e.preventDefault();
  isDrawing = true;
  const pos = getEventPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  e.preventDefault();
  if (!isDrawing) return;
  const pos = getEventPos(e);
  ctx.lineCap = 'round';
  ctx.strokeStyle = drawMode ? colorPicker.value : bgColorPicker.value;
  ctx.lineWidth = brushSize.value;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing(e) {
  e.preventDefault();
  isDrawing = false;
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing
