
function Particle(cx, properties){
    this.cx = cx;
    this.x = properties.x || 0;
    this.y = properties.y || 0;

    // velocity
    this.xVelocity = properties.xVelocity || 0;
    this.yVelocity = properties.yVelocity || 0;

    // drag
    this.drag = properties.drag || 1; // 1 === no drag

    // size
    this.size = properties.size || 2;
    this.grow = properties.grow || 1; // 1 === no grow
}
Particle.prototype = {
    frame: function(){
        // velocity
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // drag
        this.xVelocity = this.xVelocity * this.drag;
        this.yVelocity = this.yVelocity * this.drag;

        // size
        this.size = this.size * this.grow;
    },
    render: function(){
        this.cx.fillStyle = '#000000';
        this.cx.fillRect(
            this.x - (this.size / 2),
            this.y - (this.size / 2),
            this.size,
            this.size
        );
    }
};

