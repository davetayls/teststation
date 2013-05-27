
var screenWidth,
	screenHeight,
	canvas,
	ctx,
	startPos
;

window.pause = false;

var seed = 0,
	max  = 120,
	gap  = 60,
	frame = 0,
	values = [],
	colors = [
		hsla(0,   100, 50, 0.5),
		hsla(50,  100, 50, 0.5),
		hsla(125, 100, 50, 0.5),
		hsla(200, 100, 50, 0.5),
		hsla(300, 100, 50, 0.5)
	]
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
	ctx.line(0, startPos.y, screenWidth, startPos.y);

	if (!window.pause){
		frame++;
		seed+=step;
		var val = 0;
		try {
			val = getVal(seed);
		} catch(e){
			val = 0;
		}
		values.push({
			seed: seed,
			value: val,
			frame: frame
		});
		if (values.length > max){
			values.shift(1);
		}
	}

	// colors
	for (var c=0; c < colors.length; c++){
		ctx.fillStyle = colors[c];
		ctx.fillCircle(20*c+20, canvas.height-40, 5);
	}

	// lines
	var startSeed = values[0] ? values[0].seed : 0,
		zoom = window.zoom === 'auto' ? (canvas.width / window.max) / (window.step*gap) : window.zoom
	;
	for (var i=0; i < values.length; i++){
		ctx.fillStyle = '#ffff00';
		ctx.strokeStyle = '#ffff00';
		var v = values[i],
			x = startPos.x,
			y
		;
		x+=(v.seed-startSeed)*(gap*zoom);
		if (v.frame%5 === 0){
			ctx.line(x, startPos.y, x, startPos.y+10);
			ctx.font = '9px monospace';
			rotatedText(v.seed, x, startPos.y+20, 90);
		}
		for (var vi=0; vi < v.value.length; vi++){
			y=startPos.y-v.value[vi];
			colors[vi] = colors[vi] || hsla(random(100, 300), 100, 50, 0.5);
			ctx.fillStyle = colors[vi]
			ctx.fillCircle(x, y, 2);
		}
	}
}

function initObjects() {
}

function initVars() {
	resize();
}
function initCanvas() {
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

	document.body.appendChild(canvas);
	canvas.width = screenWidth*0.6;
	canvas.height = screenHeight*0.96;
}
function initListeners() {
	window.addEventListener('resize', resize, false);
	canvas.addEventListener('click', function(){
		window.pause = !window.pause;
	});
}
function resize() {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	startPos = new Vector2(20, Math.abs(screenHeight/2));

	if (canvas){
		canvas.width = screenWidth*0.6;
		canvas.height = screenHeight*0.96;
	}
}

function onKeyDown(e) {
	if (e.ctrlKey && e.which === 13){
		evalScript();
		e.preventDefault();
	}
}

function evalScript(){
	try {
		eval(document.getElementById('script').innerText);
	} catch(e){
		console.error(e);
	}
}

var TO_RADIANS = Math.PI/180;
function rotatedText(text, x, y, angle) {

	// save the current co-ordinate system
	// before we screw with it
	ctx.save();

	// move to the middle of where we want to draw our image
	ctx.translate(x, y);

	// rotate around that point, converting our
	// angle from degrees to radians
	ctx.rotate(angle * TO_RADIANS);

	// draw it up and to the left by half the width
	// and height of the image
	ctx.fillText(text, 0, 0);

	// and restore the co-ords to how they were when we began
	ctx.restore();
}
