function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}
Point.prototype.fromPolar = function(ang, rad) {
    this.x = Math.cos(ang) * rad;
    this.y = Math.sin(ang) * rad;

    return this;
};