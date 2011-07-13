
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
    this.maxSize = properties.maxSize || 100;

    // opacity
    this.opacity = properties.opacity || 1;

    // image
    this.image = properties.image || null;
}
Particle.prototype = {
    getVelocity: function(){
    },
    basicDrag: function(vel, drag){
        return vel * drag; 
    },
    frame: function(){
        // drag
        if (typeof this.drag === 'function') {
            this.xVelocity = this.drag(this.xVelocity, 'x');
            this.yVelocity = this.drag(this.yVelocity, 'y');
        } else {
            this.xVelocity = this.basicDrag(this.xVelocity, this.drag);
            this.yVelocity = this.basicDrag(this.yVelocity, this.drag);
        }

        // velocity
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // size
        this.size = this.size > this.maxSize ? this.size : this.size * this.grow;
    },
    render: function(){
        if (this.image) {
            this.cx.drawImage(this.image, this.x, this.y);
        } else {
            this.cx.fillStyle = 'rgba(0,0,0,' + this.opacity + ')';
            this.cx.fillRect(
                this.x - (this.size / 2),
                this.y - (this.size / 2),
                this.size,
                this.size
            );
        }
    }
};

