
/**
 * @constructor
 */
function QuadTree(x, y, w, h) {
	this.thresh = 4;
	this.segs = [];
	this.quads = [];

	this.rect = new Rect2D(x, y, w, h);
}

QuadTree.prototype.addSegments = function(segs) {
	for (var i = 0; i < segs.length; i++) {
		if (this.rect.overlapsWithLine(segs[i])) {
			this.segs.push(segs[i]);
		}
	}

	if (this.segs.length > this.thresh) {
		this.subdivide();
	}
};

QuadTree.prototype.getIntersection = function(seg) {
	if (!this.rect.overlapsWithLine(seg))
		return null;

	for (var i = 0; i < this.segs.length; i++) {
		var s = this.segs[i];
		var inter = s.getIntersection(seg);
		if (inter) {
			var o = {};
			return s;
		}
	}

	for (var i = 0; i < this.quads.length; i++) {
		var inter = this.quads[i].getIntersection(seg);
		if (inter)
			return inter;
	}

	return null;
};

QuadTree.prototype.subdivide = function() {
	var w2 = this.rect.w / 2,
	    h2 = this.rect.h / 2,
	    x = this.rect.x,
	    y = this.rect.y;

	this.quads.push(new QuadTree(x, y, w2, h2));
	this.quads.push(new QuadTree(x + w2, y, w2, h2));
	this.quads.push(new QuadTree(x + w2, y + h2, w2, h2));
	this.quads.push(new QuadTree(x, y + h2, w2, h2));

	for (var i = 0; i < this.quads.length; i++) {
		this.quads[i].addSegments(this.segs);
	}

	this.segs = [];
};

QuadTree.prototype.display = function(ctx, mx, my, ibOnly) {

	var inBox = this.rect.containsPoint(new Point(mx, my));

	ctx.strokeStyle = inBox ? '#FF44CC' : '#000000';

	if (inBox || !ibOnly) {
		ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
		for (var i = 0; i < this.quads.length; i++) {
			this.quads[i].display(ctx, mx, my, ibOnly);
		}
	}

	if (inBox) {
		ctx.strokeStyle = '#FF0000';
		for (var i = 0 ; i < this.segs.length; i++) {
			var s = this.segs[i];
			ctx.beginPath();
			ctx.moveTo(s.a.x, s.a.y);
			ctx.lineTo(s.b.x, s.b.y);
			ctx.stroke();
		}
	}
};

