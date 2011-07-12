
function Particle(cx, properties){
    this.cx = cx;
    this.x = properties.x || 0;
    this.y = properties.y || 0;

    // velocity
    this.xVelocity = properties.xVelocity || 0;
    this.yVelocity = properties.yVelocity || 0;

    // drag
    this.drag = properties.drag || 1; // 1 === no drag

}
Particle.prototype = {
    frame: function(){
        // velocity
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // drag
        this.xVelocity = this.xVelocity * this.drag;
        this.yVelocity = this.yVelocity * this.drag;

    },
    render: function(){
        this.cx.fillStyle = '#000000';
        this.cx.fillRect(this.x,this.y,2,2);
    }
};

