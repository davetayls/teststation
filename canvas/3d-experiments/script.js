var x = document.getElementById('canvas').getContext('2d'),
    centre = [160,100],
    sqpoints = [
        [0,0],
        [20,0],
        [20,14],
        [0,14]
    ];

var drawPath = function(points) {
    x.beginPath();
    x.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i < points.length; i++) {
        var point = points[i];
        x.lineTo(point[0],point[1],2,2);
    };
    x.lineTo(points[0][0], points[0][1]);
    x.stroke();    
};

// 3d plotting functions
var distance = function(z) {
    return 256-z;
};
var scrCoords = function(x, y, z, lens) {
    lens = lens || 256;
    var dist = distance(z),
        //: 10,10,0 = (10) + 160
        //: 10,10,128 = (20) + 160
        scrX = (lens * x / dist) + centre[0],
        scrY = centre[1] - (lens * y / dist);
    return [scrX, scrY];
};
var projectPoints = function(points, z) {
    var newPoints = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        newPoints.push(scrCoords(point[0], point[1], z));
    };
    return newPoints;
};

function draw () {
    
    x.clearRect(0,0,320,200);
    
    // drawPath(sqpoints);
    for (var i = 0; i < 256; i+=32) {
        drawPath(projectPoints(sqpoints, i));
    };

    
    
    setTimeout(draw, 10);

}
draw();
