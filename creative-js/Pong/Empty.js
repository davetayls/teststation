
var ball,
	playerPaddle,
	computerPaddle
;

var screenWidth,
	screenHeight,
	canvas,
	ctx;

// set up automatically called on load by creative-js.js
function setup(){
	initVars();
	initCanvas();
	initObjects();
}

// MAIN GAME LOOP
// draw automatically called by creative-js.js
function draw() {

	ctx.clearRect(0,0,canvas.width, canvas.height);

	ball.update();
	playerPaddle.pos.y = mouseY - (playerPaddle.height/2);

	checkCollisions();

	ball.render(ctx);
	playerPaddle.render(ctx);
	computerPaddle.render(ctx);

}

function checkCollisions() {
	if (ball.pos.y + ball.height > screenHeight){
		ball.vel.y *= -1;
		ball.pos.y = screenHeight - ball.height;
	}
	if (ball.pos.y < 0){
		ball.vel.y *= -1;
		ball.pos.y = 0;
	}
	if (ball.pos.x + ball.width > screenWidth){
		ball.vel.x *= -1;
		ball.pos.x = screenWidth - ball.width;
	}
	if (ball.pos.x < 0){
		// ball.vel.x *= -1;
		// ball.pos.x = 0;
	}

	// collision detection with the left paddle
	if (
		// x < right side of paddle
		(ball.pos.x < playerPaddle.pos.x + playerPaddle.width)
		// and x in last frame > right side of paddle
		&& (ball.pos.x - ball.vel.x) > (playerPaddle.pos.x + playerPaddle.width)
	){

		if (){

			// reset ball pos to be on right edge
			ball.pos.x
			// reset direction of ball

		}

	}
}


function initObjects() {
	ball = new Ball();
	playerPaddle = new Paddle(10,  screenHeight/2);
	computerPaddle = new Paddle(screenWidth-20,  screenHeight/2);
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


/**
 * Ball
 */

function Ball(){
	var pos = this.pos = new Vector2(0,0);
	var vel = this.vel = new Vector2(5,5);
	this.width = 10;
	this.height = 10;

	this.update = function(){

		pos.plusEq(vel);

	};

	this.render = function(ctx){

		ctx.fillStyle = hsl(random(100, 230), 100, 50);
		ctx.fillRect(pos.x, pos.y, this.width, this.height);

	};

}

/**
 * Paddle
 */
function Paddle(x, y) {

	var pos = this.pos = new Vector2(x, y);

	this.width = 10;
	this.height = 80;

	this.render = function(ctx){

		ctx.fillStyle = 'white';
		ctx.fillRect(pos.x, pos.y, this.width, this.height);

	};

}













