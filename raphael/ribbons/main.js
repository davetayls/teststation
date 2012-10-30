/*global Tweenable */

var ribbons = document.getElementById('ribbons'),

	// paper
	width   = 800,
	height  = 500,
	hHeight = Math.floor(height/2),
	paper   = Raphael(ribbons, width, height),
	path1   = paper.set(),
	circ1,
	ribbons = paper.set(),
	ribbon2 = paper.set(),
	ribbon3 = paper.set(),

	easing  = '>',
	tween   = new Tweenable(),

	// ribbons
	cx      = -1939
	;

$.when(
	$.get('ribbons.svg'),
	$.get('path1.svg')
).done(function(r1, r2, r3){
	paper.importSVG(r1[0], ribbons);
	paper.importSVG(r2[0], path1);
	path1 = path1[0];


	ribbons.transform(getTransform(0, cx + hHeight));
	path1.attr({ stroke: '#fff' }).transform(getTransform(0, 200));

	var bBox = path1.getBBox();

	tween.tween({
		from: { x: 0 },
		to: { x: 15 },
		duration: 3000,
		easing: 'easeOutQuad',
		step: function(state){
			var percWidth = (state.x/100) * bBox.width,
				pt = path1.getPointAtLength(percWidth + (width/2));
			paper.setViewBox(
				pt.x - (width/2),
				pt.y - (height - 100),
				width, height, true);
		}
	});

	$('body').click(function(e){
		tween.to({ x: tween.get().x+20 });
	});

	// animateViewBox(1,1, 1.1);

	// ribbons.attr({
	// 	guide: path1,
	// 	offsets: {
	// 		y: cx + hHeight
	// 	},
	// 	along: 1
	// })
	// .animate({ along: 0.8 }, 10000, easing)
	// ;

});

function getTransform(left, top){
	return ['T',left,',',top].join();
}