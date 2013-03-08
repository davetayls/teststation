function Color(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Color.prototype.toCanvasColor = function() {
	return 'rgb(' + parseInt(this.r) + ',' + parseInt(this.g) + ',' + parseInt(this.b) + ')';
};

Color.prototype.interpolate = function(x, other) {
	return new Color(
		this.r + (other.r - this.r) * x,
		this.g + (other.g - this.g) * x,
		this.b + (other.b - this.b) * x,
		this.a + (other.a - this.a) * x);
};

