// standard global variables
var container,
    scene,
    camera,
    renderer,
    controls,
    stats,
    keyboard      = new THREEx.KeyboardState(),
    clock         = new THREE.Clock(),

    SCREEN_WIDTH  = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,

    gui           = new dat.GUI()
;

function _init(){
    scene = new THREE.Scene();
    initCamera();
    initRenderer();
    initControls();
}

function animate()
{
    requestAnimationFrame( animate );
    render();
    update();
}

function render()
{
    renderer.render( scene, camera );
}

function initCamera(){
    // set the view size in pixels (custom or according to window size)
    // var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
    // camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 20000
    ;
    // set up camera
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    // add the camera to the scene
    scene.add(camera);
    // the camera defaults to position (0,0,0)
    //  so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
    camera.position.set(400,150,400);
    // camera.lookAt(scene.position);
}

function initRenderer() {

    // create and start the renderer; choose antialias setting.
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer();

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    // attach renderer to the container div
    document.body.appendChild( renderer.domElement );

}

function initControls(){

    // automatically resize renderer
    if (THREEx.WindowResize){
        THREEx.WindowResize(renderer, camera);
    }

    // toggle full-screen on given key press
    if (THREE.FullScreen){
        THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    }

    // move mouse and: left   click (or hold 'A') to rotate,
    //                 middle click (or hold 'S') to zoom,
    //                 right  click (or hold 'D') to pan
    if (THREE.TrackballControls){
        controls = new THREE.TrackballControls( camera, renderer.domElement );
    }


    ///////////
    // STATS //
    ///////////

    // displays current and past frames per second attained by scene
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

}

function addAxes(){
    // create a set of coordinate axes to help orient user
    //    specify length in pixels in each direction
    var axes = new THREE.AxisHelper(100);
    scene.add( axes );
}

function addFloor() {
    // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
    var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 10, 10 );
    // DoubleSide: render texture on both sides of mesh
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

}

function addSkyBox() {
    // recommend either a skybox or fog effect (can't use both at the same time)
    // without one of these, the scene's background color is determined by webpage background

    // make sure the camera's "far" value is large enough so that it will render the skyBox!
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );

    scene.add(skyBox);
}

function addPointLight(){
    // create a light
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    // var ambientLight = new THREE.AmbientLight(0x111111);
    // scene.add(ambientLight);
}






/*
var WIDTH      = window.innerWidth,
    HEIGHT     = window.innerHeight
;

var VIEW_ANGLE = 45,
    ASPECT     = WIDTH / HEIGHT,
    NEAR       = 0.1,
    FAR        = 10000
;
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
);
camera.position.z = 300;

var scene = new THREE.Scene();

// add camera to the scene
scene.add(camera);

renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);
*/
