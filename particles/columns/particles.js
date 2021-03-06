			var container, stats;
			var c, 
                cx,
                canvasWidth = window.innerWidth, 
                canvasHeight = window.innerHeight,
                particles = [],

                xVelRange = 6,
                xVelocity = 0 - xVelRange,
                xVelChange = 0.3;


			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = document.getElementsByTagName('title')[0].innerHTML;
				container.appendChild( info );

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );

                c = document.createElement('canvas');
                c.style.position = 'absolute';
                c.style.top = 0;
                c.style.left = 0;
                c.width = canvasWidth;
                c.height = canvasHeight;
                container.appendChild(c);

                cx = c.getContext('2d');
			}

			function render() {

                cx.clearRect(0,0, canvasWidth, canvasHeight);

                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    p.render();
                    p.frame();
                }
                if (xVelocity > xVelRange) {
                    xVelChange = 0 - Math.abs(xVelChange);
                }else if (xVelocity < (0 - xVelRange)){
                    xVelChange = Math.abs(xVelChange);
                }
                xVelocity = xVelocity + xVelChange;

                if (particles.length < 2000) {
                    particles.push(new Particle(cx, {
                        x: canvasWidth / 2,
                        y: (canvasHeight / 5),
                        xVelocity: xVelocity,
                        yVelocity: 2,
                        drag: 0.95 + (Math.random() * 0.05),
                        maxSize: 20,
                        opacity: Math.random()
                    }));
                }
			}
			function animate() {
				requestAnimationFrame( animate );

				render();
				stats.update();
			}


			init();
			animate();

