			var container, stats;
			var c, 
                cx,
                canvasWidth = window.innerWidth, 
                canvasHeight = window.innerHeight,
                particles = [];


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
                if (particles.length < 5000) {
                    particles.push(new Particle(cx, {
                        x: canvasWidth / 2,
                        y: (canvasHeight / 5) * 4,
                        xVelocity: (Math.random() * 4) -2, 
                        yVelocity: -1 - (Math.random() * 5),
                        grow: 1 + (Math.random() * 0.01),
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

