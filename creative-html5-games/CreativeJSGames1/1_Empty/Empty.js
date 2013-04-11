
var screenWidth,
	screenHeight,
	canvas,
	ctx;

// set up automatically called on load by creativejs.js
function setup(){
	initVars();
	initCanvas();
	initObjects();

}

// MAIN GAME LOOP
// draw automatically called by creativejs.js
function draw() {

	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle = hsl(random(180, 200), 100, random(30, 80));
	ctx.fillRect(random(0, screenWidth), random(0, screenHeight), 100, 100);

	ctx.fillStyle = hsl(random(0, 30), 100, random(30, 80));
	ctx.fillRect(random(0, screenWidth), random(0, screenHeight), 100, 100);

}


function initObjects() {

}

function initVars() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
}

function initCanvas() {

	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

	document.body.appendChild(canvas);
	canvas.width = screenWidth;
	canvas.height = screenHeight;
}

