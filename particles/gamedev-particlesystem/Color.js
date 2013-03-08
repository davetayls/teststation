function Color(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}
Color.prototype = {

    // core values (black)
    r: 0, g: 0, b: 0, a: 1,

    interpolate: function(percent, other) {
        return new Color(
            this.r + (other.r - this.r) * percent,
            this.g + (other.g - this.g) * percent,
            this.b + (other.b - this.b) * percent,
            this.a + (other.a - this.a) * percent);
    },
    toCanvasColor: function() {
        return 'rgb(' + parseInt(this.r, 10) + ',' + parseInt(this.g, 10) + ',' + parseInt(this.b, 10) + ')';
    }
};
