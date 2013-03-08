function Line(a, b) {
	this.a = a;
	this.b = b;
}

Line.prototype.length = function() {
	return a.distance(b);
};

Line.prototype.getIntersection = function(other) {
	var nx, ny, dn;
	var x4_x3 = other.b.x - other.a.x;
	var pre2 = other.b.y - other.a.y;
	var pre3 = this.b.x - this.a.x;
	var pre4 = this.b.y - this.a.y;
	var pre5 = this.a.y - other.a.y;
	var pre6 = this.a.x - other.a.x;

	nx = x4_x3 * pre5 - pre2 * pre6;
	ny = pre3 * pre5 - pre4 * pre6;
	dn = pre2 * pre3 - x4_x3 * pre4;

	nx /= dn;
	ny /= dn;

	if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
		ny = this.y + nx * pre4;
		nx = this.x + nx * pre3;
		return new Point(nx, ny);
	}
	return null;
};

Line.prototype.reflect = function(vel) {
	var diff = this.a.minus(this.b);
	var n = new Point(diff.y, -diff.x).normal();
	return vel.add(n.times(-2 * vel.dot(n)));
};

