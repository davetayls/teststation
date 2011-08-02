			var container, stats;
			var c, 
                cx,
                canvasWidth = window.innerWidth, 
                canvasHeight = window.innerHeight,
                sets = [];

            function addSet(xOrigin, yOrigin){

                var particles = [],
                    yVelocity = yOrigin > canvasHeight / 2 ? -2 : 2,
                    xVelRange = 1,
                    xVelocity = 0 - xVelRange,
                    xVelChange = 0.3,
                    xVelTweak = xOrigin > canvasWidth / 2 ? -0.2 : 0.2;

                particles.push(new Particle(cx, {
                    x: 10,
                    y: canvasHeight /2,
                    xVelocity: 6,
                    yVelocity: 0,
                    opacity: Math.random()
                }));
                
                return {
                    render: function() {
                        for (var i = 0; i < particles.length; i++) {
                            var p = particles[i];
                            p.render();
                            p.frame();
                        }
                    }
                };
            }

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
                for (var i = 0; i < sets.length; i+=1) {
                    sets[i].render();
                }
			}
			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}

			init();
            document.addEventListener('mousedown', function(e){
                sets.push(addSet(e.clientX, e.clientY));
            }, false);
			animate();
            sets.push(addSet());

