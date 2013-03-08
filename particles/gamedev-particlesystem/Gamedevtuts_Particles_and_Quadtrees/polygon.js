//A simple polygon class.  Represents a solid polygon
function Polygon(color) {
	this.color = color;
	this.points = [];
}

Polygon.prototype.addPoint = function(pt) {
	this.points.push(pt);
};

Polygon.prototype.getSegments = function() {
	var segs = [];
	for (var i = 0; i < this.points.length; i++) {
		segs.push(new Line(this.points[i],
					this.points[(i + 1)%this.points.length]));
	}

	return segs;
};


Polygon.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color.toCanvasColor();
	ctx.globalAlpha = this.color.a;

	ctx.beginPath();
	ctx.moveTo(this.points[0].x, this.points[0].y);

	for (var i = 1; i < this.points.length; i++) {
		var pt = this.points[i];
		ctx.lineTo(pt.x, pt.y);
	}
	
	ctx.fill();
};

