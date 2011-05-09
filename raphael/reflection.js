window.onload = function () {
    var img = document.getElementById("photo");
    img.style.display = "none";
    var r = Raphael("holder", 600, 540);
    
    r.image(img.src, 140, 140, 320, 240);
    r.image(img.src, 140, 380, 320, 240).scale(1, -1).attr({opacity: .5});
    r.rect(0, 380, 600, 160).attr({gradient: "90-#000-#000", opacity: .5});
};