'use strict';

const canvas = document.querySelector('canvas');
const toolsButtons = document.querySelectorAll('.tool');

let isDrawing = false;
let brushWidth = 5;

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

toolsButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		// console.log(btn.id);
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
	});
});

canvas.addEventListener('mousemove', drawing);

//start drawing after clicking and holding mouse
canvas.addEventListener('mousedown', () => {
	isDrawing = true;
	ctx.beginPath();
	ctx.lineWidth = brushWidth; //passing brush width
});

//end drawing after letting mouse
canvas.addEventListener('mouseup', () => (isDrawing = false));
