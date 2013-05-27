
var screenWidth,
	screenHeight,
	canvas,
	ctx;

var particles = [],
	anchors   = [],
	explosions = [],
	lines = [],
	lineFrom,
	numParticles = 10
;

// set up automatically called on load by creative-js.js
function setup(){
	initVars();
	initCanvas();
	initObjects();
	initListeners();
}

// MAIN GAME LOOP
// draw automatically called by creative-js.js
function draw() {

	ctx.clearRect(0,0,canvas.width, canvas.height);

	updateParticles();
	updateAnchors();
	updateExplosions();
	updateLines();

	renderParticles();
	renderAnchors();
	renderExplosions();
	renderLines();

}
function updateParticles() {
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
	}
}
function renderParticles() {
	for (var i = 0; i < particles.length; i++) {
		particles[i].render(ctx);
	}
}
function updateAnchors() {
	for (var i = 0; i < anchors.length; i++) {
		anchors[i].update();
	}
}
function renderAnchors() {
	for (var i = 0; i < anchors.length; i++) {
		anchors[i].render(ctx);
	}
}

function updateExplosions() {
	for (var i = 0; i < explosions.length; i++) {
		explosions[i].update();
	}
}
function renderExplosions() {
	for (var i = 0; i < explosions.length; i++) {
		explosions[i].render(ctx);
	}
}
function updateLines() {
	for (var i = 0; i < lines.length; i++) {
		lines[i].update();
	}
}
function renderLines() {
	for (var i = 0; i < lines.length; i++) {
		lines[i].render(ctx);
	}
}

function initObjects() {
	for (var i=0; i < numParticles; i++){
		var p = new Particle(random(0, screenWidth), random(0, screenHeight));
		p.vel.x = random(-2,2);
		p.vel.y = random(-2,2);
		particles.push(p);
	}
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
function initListeners() {
	document.addEventListener( 'mouseup', addAnchor, false );
}

function addAnchor(event) {
	var x = event.x,
		y = event.y,
		selectAnchor
	;
	for (var i=0; i < anchors.length; i++){
		if (dist(x, y, anchors[i].pos.x, anchors[i].pos.y) < 20){
			selectAnchor = anchors[i];
		}
	}
	if (selectAnchor){
		if (lineFrom){
			lines.push(new Line(lineFrom, selectAnchor));
			lineFrom = null;
		} else {
			lineFrom = selectAnchor;
			selectAnchor.isSelected = true;
		}
	} else {
		anchors.push(new Anchor(event.x, event.y));
	}
}

function Line(from, to) {
	from.line = this;
	to.line = this;

	this.from = from;
	this.to = to;

	this.update = function(){

	};
	this.render = function(c){
		if (!this.from.dead && !this.to.dead){
			c.line(this.from.pos.x, this.from.pos.y, this.to.pos.x, this.to.pos.y);
		}
	};
}

/**
 * Anchor which can have a line attached
 */
function Anchor(x, y, r) {
	var pos = this.pos = new Vector2(x,y),
		vel = this.vel = new Vector2(0,0),
		angle = random(360),
		radius = r || 4,
		grow = 0.02
	;
	this.dead = false;
	vel.rotate(angle);
	this.color = hsla(random(0, 200), 100, 30, 1);

	this.update = function(){
		if (radius >= 20 && !this.dead){
			explosions.push(new Explosion(this.pos.x, this.pos.y, 100));
			this.dead = true;
		} else {
			radius+=grow;
			pos.plusEq(vel);
			if(pos.x<0) pos.x = canvas.width;
			else if(pos.x>canvas.width) pos.x = 0;
			if(pos.y<0) pos.y = canvas.height;
			else if(pos.y>canvas.height) pos.y = 0;
		}

	};

	this.render = function(c){
		if (radius < 20){
			c.strokeStyle = this.color;
			c.fillStyle = this.color;
			if (this.isSelected){
				c.strokeWidth = 2;
			}
			c.beginPath();
			c.arc(pos.x, pos.y, radius, 0, Math.PI*2, true);

			if (this.line){
				c.fill();
			} else {
				c.stroke();
			}

			// center
			c.beginPath();
			c.arc(pos.x, pos.y, 1, 0, Math.PI*2, true);
			c.fill();
		}

	};
}

/**
 * Particle
 */
function Particle(x, y, r){

	var pos = this.pos = new Vector2(x,y),
		vel = this.vel = new Vector2(0,0),
		angle = random(360),
		radius = r || 4,
		life = 0
	;
	vel.rotate(angle);
	this.color = hsla(random(0, 200), 100, 30, 1);

	this.update = function(){
		if (this.lifeSpan && this.lifeSpan < life){
			return;
		}
		life++;
		pos.plusEq(vel);

		if(pos.x<0) pos.x = canvas.width;
		else if(pos.x>canvas.width) pos.x = 0;
		if(pos.y<0) pos.y = canvas.height;
		else if(pos.y>canvas.height) pos.y = 0;
	};

	this.render = function(c){
		if (this.lifeSpan && this.lifeSpan < life){
			return;
		}

		c.strokeStyle = this.color;
		c.beginPath();
		c.arc(pos.x, pos.y, radius, 0, Math.PI*2, true);
		c.stroke();

	};

}

function Explosion(x, y, numOfParticles) {
	this.particles = [];

	for (var i=0; i < numOfParticles; i++){
		var p = new Particle(x,y, 1);
		p.vel.x = random(-4,4);
		p.vel.y = random(-4,4);
		p.lifeSpan = random(0.2,0.5) * 60;
		this.particles.push(p);
	}

	this.update = function(){
		for (var i=0; i < this.particles.length; i++){
			this.particles[i].update();
		}
	};
	this.render = function(c){
		for (var i=0; i < this.particles.length; i++){
			this.particles[i].render(c);
		}
	};
}
