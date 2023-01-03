'use strict';

const canvas = document.querySelector('canvas');
const toolsButtons = document.querySelectorAll('.tool');
const fillColor = document.querySelector('#fill-color');

let isDrawing = false;
let brushWidth = 5;
let selectedTool = 'brush';

let prevMouseX;
let prevMouseY;

let snapshot;

//this method returns a drawing context on the canvas
const ctx = canvas.getContext('2d');

window.addEventListener('load', () => {
	//draw at exact position of mouse
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
});

const startDrawing = (e) => {
	isDrawing = true;
	prevMouseX = e.offsetX;
	prevMouseY = e.offsetY;
	ctx.beginPath();
	ctx.lineWidth = brushWidth; //passing brush width

	//copying canvas data and passing as snapshot value
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
	if (!isDrawing) return; //if isDrawing is false return from here

	//adding copied data
	ctx.putImageData(snapshot, 0, 0);

	if (selectedTool === 'brush') {
		//this method create a new line
		ctx.lineTo(e.offsetX, e.offsetY);

		//drawing and filling line with color
		ctx.stroke();
	} else if (selectedTool === 'rectangle') {
		drawRectangle(e);
	} else if (selectedTool === 'circle') {
		drawCircle(e);
	} else {
		drawTriangle(e);
	}
};

const drawRectangle = (e) => {
	if (!fillColor.checked) {
		return ctx.strokeRect(
			e.offsetX,
			e.offsetY,
			prevMouseX - e.offsetX,
			prevMouseY - e.offsetY
		);
	}

	ctx.fillRect(
		e.offsetX,
		e.offsetY,
		prevMouseX - e.offsetX,
		prevMouseY - e.offsetY
	);
};

const drawCircle = (e) => {
	ctx.beginPath();

	let radius = Math.sqrt(
		Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
	);

	ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);

	if (!fillColor.checked) {
		ctx.stroke();
	} else {
		ctx.fill();
	}
};

const drawTriangle = (e) => {
	ctx.beginPath();

	//moving triangle to the pointer
	ctx.moveTo(prevMouseX, prevMouseY);

	//creating first line
	ctx.lineTo(e.offsetX, e.offsetY);

	//bottom line of triangle
	ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);

	//closing triangle
	ctx.closePath();

	if (!fillColor.checked) {
		ctx.stroke();
	} else {
		ctx.fill();
	}
};

toolsButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		// console.log(btn.id);
		document.querySelector('.active').classList.remove('active');
		btn.classList.add('active');
		selectedTool = btn.id;
	});
});

canvas.addEventListener('mousemove', drawing);

//start drawing after clicking and holding mouse
canvas.addEventListener('mousedown', startDrawing);

//end drawing after letting mouse
canvas.addEventListener('mouseup', () => (isDrawing = false));
