function runDemo(cvs, text, delayRun, onDraw) {
	var W = 600;
	var H = 480;

	var ctx = cvs.getContext('2d');

	var demoRunning = !delayRun;
	var demoTime = 0;

	cvs.addEventListener('click', function() {
		demoRunning = true;
		demoTime = 0;
	});

	var mx = 0, my = 0;
	cvs.addEventListener('mousemove', function(e) {
			var cp = findPos(cvs);
			mx = e.pageX - cp.x;
			my = e.pageY - cp.y - 30.0;

	});

	var lastTime = new Date().getTime();
	var drawFrame = function() {
		var currTime = new Date().getTime();
		var frameTime = (currTime - lastTime) / 1000.0;
		lastTime = currTime;

		if (!demoRunning) {
			ctx.fillStyle = '#AAAAFF';
			ctx.fillRect(0, 0, W, H);

			ctx.fillStyle = '#000000';
			ctx.font = 'italic 36px serif';
			ctx.fillText(text, 20, 50);
			requestAnimFrame(drawFrame);
			return;
		}

		demoTime += 1.0 / 60;
		if (demoTime > 15.0)
			demoRunning = !delayRun;

		onDraw(ctx, frameTime, mx, my);
		requestAnimFrame(drawFrame);
	};

	requestAnimFrame(drawFrame);

}
/*
$(document).ready(function() {
	if (!isCanvasSupported())
		return;
	$('.post_image a img').hide();


	
	//Create a canvas
	var post_image = $('.post_image')[0];
	var cvs = document.createElement('canvas');
	cvs.width = 200;
	cvs.height = 200;
	post_image.appendChild(cvs);


	//Create a basic particle system
	var ps = new ParticleSystem({
		particlesPerSecond: 200,
	    	particleLife: 0.8,
	    	colors: new Gradient([ new Color(255, 255, 255, 1), new Color(255, 255, 0, 1), new Color(255, 0, 0, 1), new Color(200, 200, 200, 0)]),
		minVelocity: 150,
		maxvelocity: 250,
	    	pos: new Point(100, 20),
	    	angle: Math.PI / 2,
		angleVariation: 0.6
	});


	//Every frame update and render the PS
	var drawFrame = function(ctx, frameTime) {
		ctx.fillStyle = '#6666AA';
		ctx.fillRect(0, 0, 200, 200);

		ps.step(frameTime);
		ps.draw(ctx, frameTime);
	};

	//Start the demo loop
	runDemo(cvs, '', false, drawFrame);

});
*/


function createFullDemo(cvs, text, drawGrid) {
	var W = 600;
	var H = 480;

	//Create our quad-tree
	var qt = new QuadTree(0,0, W, H);

	//Generate some random geometry
	var colors = [new Color(255, 0, 0, 0.7),
	    new Color(0, 255, 0, 0.7),
	    new Color(0, 0, 255, 0.7),
	    new Color(255, 255, 0, 0.7),
	    new Color(255, 0, 255, 0.7)];

	//Generate geometry
	var polygons = [];
	var segs = [];

	for (var i = 0 ; i < 25; i++) {
		var poly = new Polygon(colors[i%colors.length]);

		var numPoints = parseInt(Math.random() * 5) + 3;
		var center = new Point(Math.random() * W, (Math.random() * 0.8 + 0.2) * H);

		var angleOffset = Math.random() * 2 * Math.PI;
		var radius = Math.random() * 55 + 5;

		for (var j = 0; j < numPoints; j++) {
			var angle = angleOffset + 2 * Math.PI * j / numPoints;
			poly.addPoint(new Point().fromPolar(angle, radius).add(center));
		}

		segs.push.apply(segs, poly.getSegments());
		polygons.push(poly);
	}

	qt.addSegments(segs);


	//Create the particle system
	var ps = new ParticleSystem({
		particlesPerSecond: 20,
		particleLife: 15.0,
		colors: new Gradient([ new Color(255, 0, 0, 1), new Color(255, 0, 255, 1), new Color(0, 0, 255, 0.5), new Color(0, 0, 127, 0)]),
		collider: qt
	});

	var psAngle = 0;

	var drawFrame = function(ctx, frameTime, mx, my) {
		ctx.fillStyle = '#AAAAFF';
		ctx.fillRect(0, 0, W, H);

		psAngle += frameTime;

		ps.params.pos = new Point(Math.cos(psAngle) * (W / 2) + W / 2, H / 10);
		ps.step(frameTime);
		ps.draw(ctx, frameTime);



		for (var i = 0; i < polygons.length; i++) {
			polygons[i].draw(ctx);
		}

		ctx.globalAlpha = 1.0;

		if (drawGrid) {
			qt.display(ctx, mx, my);
			qt.display(ctx, mx, my, true);
		}

	};
	runDemo(cvs, text, true, drawFrame);
}
$(document).ready(function() {
	createFullDemo($('#qtdemo_nogrid')[0], 'Click to see what you will create', false);
	createFullDemo($('#qtdemo')[0], 'Click to start quadtree demo', true);
});

$(document).ready(function() {
	var W = 640;
	var H = 480;

	var ps = new ParticleSystem({
		angleVariation: Math.PI / 6.0,
		particlesPerSecond: 100,
		particleLife: 1.5,
		colors: new Gradient([ new Color(255, 255, 255, 1), new Color(255, 000, 255, 1), new Color(0, 0, 100, 0.5), new Color(0, 0, 0, 0)]),
		maxVelocity: 200,
		minVelocity: 25,
		collider: null,
		pos: new Point(W / 2, H / 2)
	});

	var drawFrame = function(ctx, frameTime) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, W, H);

		ps.params.angle += 0.5 * Math.PI * 1.0 / 60;
		ps.step(frameTime);
		ps.draw(ctx, frameTime);
	};

	runDemo($('#spin_demo')[0], 'Click to see a particle system', true, drawFrame);
});

$(document).ready(function() {
	var W = 640;
	var H = 480;

	//Create an empty quad-tree
	var qt = new QuadTree(0,0, W, H);


	//Generate a polygon
	var poly = new Polygon(new Color(127, 127, 127, 1));
	poly.addPoint(new Point(20, H / 2));
	poly.addPoint(new Point(20 + 200, H / 2 + 200));
	poly.addPoint(new Point(200, H / 2 + 200));
	poly.addPoint(new Point(0, H / 2));

	//Store polygon segments for collision detection
	qt.addSegments(poly.getSegments());

	//Create particle system
	var ps = new ParticleSystem({
		angleVariation: Math.PI / 6.0,
		particlesPerSecond: 100,
		particleLife: 3.5,
		colors: new Gradient([ new Color(255, 255, 255, 1), new Color(0, 255, 0, 1), new Color(0, 0, 255, 0.5), new Color(0, 0, 255, 0)]),
		maxVelocity: 200,
		minVelocity: 150,
		collider: qt,
		pos: new Point(W / 2, H / 2)
	});

	var totalTime = 0;
	var drawFrame = function(ctx, frameTime) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, W, H);

		totalTime += frameTime;
		ps.params.angle = Math.cos(2 * Math.PI * totalTime) + Math.PI / 1.0;
		ps.step(frameTime);
		ps.draw(ctx, frameTime);

		poly.draw(ctx);
	};

	runDemo($('#bounce_demo')[0], 'Click to see bouncing particles', true, drawFrame);

});
