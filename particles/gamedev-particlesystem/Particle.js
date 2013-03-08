
function Particle(params, pos, velocity, life) {
    this.pos = pos;
    this.velocity = velocity;
    this.life = life;
    this.maxLife = life;
    this.params = params;
}
Particle.prototype = {
    step: function(frameTime) {
        this.velocity.add(this.params.gravity.times(frameTime));
        this.pos.add(this.velocity.times(frameTime));
        this.life -= frameTime;
    },
    draw: function(ctx, frameTime) {
        //No need to draw the particle if it is out of life.
        if (this.isDead()){
            return;
        }

        //We want to travel through our gradient of colors as the particle ages
        var lifePercent = 1.0 - this.life / this.maxLife;
        var color = this.params.colors.getColor(lifePercent);

        //Set up the colors
        ctx.globalAlpha = color.a;
        ctx.fillStyle = color.toCanvasColor();

        //Fill in the rectangle at the particle's position
        ctx.fillRect(this.pos.x - 1, this.pos.y - 1, 3, 3);
    },
    isDead: function(){
        return this.life <= 0;
    }
};


