function Rect2D(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	var tl = new Point(this.x, this.y);
	var tr = tl.clone().add(new Point(w, 0));
	var bl = tl.clone().add(new Point(0, h));
	var br = bl.clone().add(new Point(w, 0));
	this.lines = [new Line(tl, tr),
			new Line(tr, br),
			new Line(br, bl),
			new Line(bl, tl)];
};

Rect2D.prototype.containsPoint = function(p) {
	var x = p.x, y = p.y;
	return x >= this.x &&
		x <= this.x + this.w &&
		y >= this.y &&
		y <= this.y + this.h;
};

Rect2D.prototype.overlapsWithLine = function(l2) {
	return this.containsPoint(l2.a) ||	
		this.containsPoint(l2.b) ||
		this.lines[0].getIntersection(l2) != null ||
		this.lines[1].getIntersection(l2) != null ||
		this.lines[2].getIntersection(l2) != null ||
		this.lines[3].getIntersection(l2) != null;
};

