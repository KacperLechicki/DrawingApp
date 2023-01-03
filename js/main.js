'use strict';

const canvas = document.querySelector('canvas');

let isDrawing = false;

//this method returns a drawing context on the canvas
const ctx = canvas.getContext('2d');

window.addEventListener('load', () => {
	//draw at exact position of mouse
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
});

const drawing = (e) => {
	if (!isDrawing) return; //if isDrawing is false return from here

	//this method create a new line
	ctx.lineTo(e.offsetX, e.offsetY);

	//drawing and filling line with color
	ctx.stroke();
};

canvas.addEventListener('mousemove', drawing);

//start drawing after clicking and holding mouse
canvas.addEventListener('mousedown', () => {
	isDrawing = true;
	ctx.beginPath();
});

//end drawing after letting mouse
canvas.addEventListener('mouseup', () => (isDrawing = false));
