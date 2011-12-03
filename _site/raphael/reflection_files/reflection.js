window.onload = function () {
    var img = document.getElementById("photo");
    img.style.display = "none";
    var r = Raphael("holder", 600, 540);
    
    var img = r.image(img.src, 140, 140, 320, 240);
	
	img.animate({ scale: "2,2",rotation: 45},1000,"bounce");
	
};