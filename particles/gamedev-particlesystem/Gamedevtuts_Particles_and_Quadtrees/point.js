function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.clone = function() {
	return new Point(this.x, this.y);
};


Point.prototype.add = function(other) {
	this.x += other.x;
	this.y += other.y;

	return this;
};

Point.prototype.plus = function(other) {
	return this.clone().add(other);
};

Point.prototype.scale = function(scalar) {
	this.x *= scalar;
	this.y *= scalar;

	return this;
};

Point.prototype.times = function(scalar) {
	return this.clone().scale(scalar);	
};

Point.prototype.subtract = function(other) {
	this.x -= other.x;
	this.y -= other.y;

	return this;
};


Point.prototype.minus = function(other) {
	return this.clone().subtract(other);
};

Point.prototype.magnitude = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Point.prototype.distance = function(other) {
	return this.minus(other).magnitude();
};

Point.prototype.dot = function(other) {
	return this.x * other.x + this.y * other.y;
};

Point.prototype.interpolate = function(x, other) {
	return this.plus(other.minus(this).times(x));
};

Point.prototype.normalize = function() {
	this.scale(1.0 / this.magnitude());
	return this;
};

Point.prototype.normal = function() {
	return this.clone().normalize();
};

Point.prototype.rotate = function(angle) {
	return new Point(this.x * Math.cos(angle) - this.y * Math.sin(angle),
			this.x * Math.sin(angle) + this.y * Math.cos(angle));
};

Point.prototype.transform = function(offset, angle) {
	this.rotate(angle).add(offset);
};

Point.prototype.average = function(other) {
	return this.interpolate(0.5, other);
};

Point.prototype.fromPolar = function(ang, rad) {
	this.x = Math.cos(ang) * rad;
	this.y = Math.sin(ang) * rad;

	return this;
};

