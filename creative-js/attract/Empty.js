
var screenWidth,
	screenHeight,
	canvas,
	ctx;

var particles = [],
	numParticles = 2000,
	attractParticles = []
;

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

	updateParticles();
	renderParticles();

}

function renderParticles() {

	for (var i = 0; i < particles.length; i++) {
		particles[i].render(ctx);
	}

	for (var i = 0; i < attractParticles.length; i++) {
		attractParticles[i].render(ctx);
	}
}


function initObjects() {

	for (var i = 0; i < numParticles; i++) {
		particles.push(new Particle(random(screenWidth), random(screenHeight)));
	}

	attractParticles.push(new Particle(screenWidth/2, screenHeight/2, 30));
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
 * Particle
 */
function Particle(x, y, r){

	var pos = this.pos = new Vector2(x,y),
		vel = this.vel = new Vector2(1,0),
		angle = random(360),
		radius = r || 4
	;
	vel.rotate(angle);
	this.color = hsla(random(0, 200), 100, 30, 1);

	this.update = function(){
		pos.plusEq(vel);

		if(pos.x<0) pos.x = canvas.width;
		else if(pos.x>canvas.width) pos.x = 0;
		if(pos.y<0) pos.y = canvas.height;
		else if(pos.y>canvas.height) pos.y = 0;
	};

	this.render = function(c){

		c.strokeStyle = this.color;
		c.beginPath();
		c.arc(pos.x, pos.y, radius, 0, Math.PI*2, true);
		c.stroke();

	};

}
