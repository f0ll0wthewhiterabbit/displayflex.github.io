const colorInput = document.querySelector(`#color`);
const widthInput = document.querySelector(`#width`);
const clear = document.querySelector(`#clear`);
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let oldX;
let oldY;
let canDraw = false;

const drawPoint = (evt) => {
	if (!canDraw) {
		return;
	}

	const y = evt.pageY - canvas.offsetTop;
	const x = evt.pageX - canvas.offsetLeft;

	ctx.beginPath();
	ctx.arc(x, y, widthInput.value / 2, 0, 2 * Math.PI);
	ctx.lineWidth = 0;
	ctx.fillStyle = colorInput.value;
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(oldX, oldY);
	ctx.lineWidth = widthInput.value;
	ctx.strokeStyle = colorInput.value;
	ctx.stroke();
	
	oldX = x;
	oldY = y;
};

document.addEventListener(`mousemove`, (evt) => {
	drawPoint(evt);
});

document.addEventListener(`mousedown`, (evt) => {
	canDraw = true;
	oldX = evt.clientX;
	oldY = evt.clientY;
});

document.addEventListener(`mouseup`, (evt) => {
	canDraw = false;
});

clear.addEventListener(`click`, (evt) => {
	evt.preventDefault();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});
