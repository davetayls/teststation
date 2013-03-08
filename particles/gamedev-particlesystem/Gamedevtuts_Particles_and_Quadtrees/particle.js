function Particle(params, pos, velocity, life) {
	this.pos = pos;
	this.velocity = velocity;
	this.life = life;
	this.maxLife = life;
	this.params = params;
}

Particle.prototype.step = function(frameTime) {
	//Save our last position
	var lastPos = this.pos.clone();

	//Move
	this.velocity.add(this.params.gravity.times(frameTime));
	this.pos.add(this.velocity.times(frameTime));


	//Can this particle bounce?
	if (this.params.collider) {
		
		//Check if we hit anything
		var intersect = this.params.collider.getIntersection(new Line(lastPos, this.pos));
		if (intersect != null) {
			//If so, we reset our position, and update our velocity to reflect the collision
			this.pos = lastPos;
			this.velocity = intersect.reflect(this.velocity).times(this.params.bounceDamper);
		}
	}

	this.life -= frameTime;
};

Particle.prototype.draw = function(ctx, frameTime) {
	//No need to draw the particle if it is out of life.
	if (this.isDead())
		return;

	//We want to travel through our gradient of colors as the particle ages
	var lifePercent = 1.0 - this.life / this.maxLife;
	var color = this.params.colors.getColor(lifePercent);
	
	//Set up the colors
	ctx.globalAlpha = color.a;
	ctx.fillStyle = color.toCanvasColor();

	//Fill in the rectangle at the particle's position
	ctx.fillRect(this.pos.x - 1, this.pos.y - 1, 3, 3);
};


Particle.prototype.isDead = function() {
	return this.life <= 0;
};

