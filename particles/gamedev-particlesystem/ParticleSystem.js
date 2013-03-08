function ParticleSystem(params) {
    //Default parameters
    this.params = {
        //Where particles spawn from
        pos : new Point(0, 0),

        //How many particles spawn every second
        particlesPerSecond : 100,

        //How long each particle lives (and how much this can vary)
        particleLife: 0.5,
        lifeVariation: 0.52,

        //The gradient of colors the particle will travel through
        colors: new Gradient([ new Color(255, 255, 255, 1), new Color(0, 0, 0, 0) ]),

        //The angle the particle will fire off at (and how much this can vary)
        angle: 0,
        angleVariation: Math.PI * 2,

        //The velocity range the particle will fire off at
        minVelocity : 20,
        maxVelocity : 50,

        //The gravity vector applied to each particle
        gravity: new Point(0, 30.8),

        //An object to test for collisions against, and bounce damping factor
        //for said collisions
        collider : null,
        bounceDamper: 0.5
    };

    //Override our default parameters with supplied parameters
    for (var p in params) {
        this.params[p] = params[p];
    }

    this.particles = [];
}

ParticleSystem.prototype.spawnParticle = function(offset) {
    //We want to fire the particle off at a random angle and a random velocity
    //within the parameters dictated for this system
    var angle = randVariation(this.params.angle, this.params.angleVariation);
    var speed = randRange(this.params.minVelocity, this.params.maxVelocity);
    var life = randVariation(this.params.particleLife, this.params.particleLife * this.params.lifeVariation);

    //Our initial velocity will be moving at the speed we chose above in the
    //direction of the angle we chose
    var velocity = new Point().fromPolar(angle, speed);

    //If we created every single particle at "pos", then every particle
    //created within one frame would start at the same place.
    //Instead, we act as if we created the particle continuously between
    //this frame and the previous frame, by starting it at a certain offset
    //along its path.
    var pos = this.params.pos.clone().add(velocity.times(offset));

    //Contruct a new particle object from the parameters we chose
    this.particles.push(new Particle(this.params, pos, velocity, life));
};



