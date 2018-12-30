'use strict';

let canvas =  document.getElementById('my');
let ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let angle = 0.4;

ctx.translate(canvas.width / 2, canvas.height / 2);

let draw = (level) => {
	if (level > 3) {
		return;
	}

	ctx.strokeStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(200, 0);
	ctx.closePath();
	ctx.stroke();

	for (let i = 0; i < 2; i++) {
		ctx.save();
		ctx.translate(200 * i / 2, 0);
		ctx.scale(0.6, 0.6);

			ctx.save();
				ctx.rotate(angle);
				draw(level + 1);
			ctx.restore();

			ctx.save();
				ctx.rotate(-angle);
				draw(level + 1);
			ctx.restore();

		ctx.restore();
	}
};

for (let i = 0; i < 6; i++) {
	draw(0);
	ctx.rotate(2 * Math.PI / 6);
}

let animate = () => {
	ctx.clearRect(-500, -500, 1000, 1000)
	angle += 0.02;
	
	ctx.save();

	for (let i = 0; i < 6; i++) {
		draw(0);
		ctx.rotate(2 * Math.PI / 6);
	}

	ctx.restore();

	window.requestAnimationFrame(animate);
};

animate();
