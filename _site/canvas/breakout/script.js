var leftDown = false,
    rightDown = false;

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);


function draw () {
    clear();
    circle(x,y,10);

    // move the paddle
    if (rightDown) { paddlex += 5; }
    else if (leftDown) { paddlex -=5; };
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

    if (x + dx > WIDTH || x + dx < 0){
        dx = -dx;
    }
    if (y + dy < 0) {
        dy = -dy;
    } else if (y + dy > HEIGHT){
        if (x > paddlex && x < paddlex + paddlew) {
            dy = -dy;
        } else {
            clearInterval(intervalId);
        };
    };

    x += dx;
    y += dy;
}

init();
