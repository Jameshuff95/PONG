let paddle = document.getElementById('paddle');
let ball = document.getElementById('ball');
let section = document.querySelector('section');

let ballSpeed = 7; // change this to the speed you want the ball to move
let ballDirection = 1; // 1 means down, -1 means up
let ballAngle = 0; // angle of ball's movement, 0 means straight down or up
let ballHorizontalDirection = 1; // 1 means right, -1 means left

// set an initial position for the ball
ball.style.top = '0';
ball.style.left = '0';

window.addEventListener('keydown', function (event) {
    let dist = 50; // change this to the distance you want the paddle to move
    let paddleCurrentPos = paddle.style.left ? parseInt(paddle.style.left.match(/-?\d+/)[0]) : 0;
    let sectionWidth = section.offsetWidth;

    switch (event.key) {
        case 'ArrowLeft': // user pressed the left arrow key
            if (paddleCurrentPos - dist >= 0) { // check if the paddle would move beyond the left edge
                paddle.style.left = (paddleCurrentPos - dist) + 'px';
            }
            break;
        case 'ArrowRight': // user pressed the right arrow key
            if (paddleCurrentPos + dist <= sectionWidth - paddle.offsetWidth) { // check if the paddle would move beyond the right edge
                paddle.style.left = (paddleCurrentPos + dist) + 'px';
            }
            break;
    }
});

function updateBallPosition() {
    let ballCurrentPos = ball.style.top ? parseFloat(ball.style.top.match(/-?\d+(\.\d+)?/)[0]) : 0;
    let ballHorizontalPos = ball.style.left ? parseFloat(ball.style.left.match(/-?\d+(\.\d+)?/)[0]) : 0;

    // check if the ball hits the top edge of the section
    if (ballCurrentPos + ballSpeed * ballDirection < 0 || ballCurrentPos + ballSpeed * ballDirection > section.offsetHeight - ball.offsetHeight) {
        ballDirection *= -1; // change the direction of the ball
    }

    // check if the ball hits the left or right edge of the section
    if (ballHorizontalPos + ballSpeed * ballAngle * ballHorizontalDirection < 0 || ballHorizontalPos + ballSpeed * ballAngle * ballHorizontalDirection > section.offsetWidth - ball.offsetWidth) {
        ballHorizontalDirection *= -1; // change the horizontal direction of the ball
    }

    // check if the ball makes contact with the paddle
    let paddleTop = paddle.offsetTop;
    let paddleLeft = paddle.offsetLeft;
    let paddleRight = paddleLeft + paddle.offsetWidth;

    if (ballDirection === 1 && ballCurrentPos + ball.offsetHeight >= paddleTop && ballHorizontalPos + ball.offsetWidth >= paddleLeft && ballHorizontalPos <= paddleRight) {
        ballDirection *= -1; // change the direction of the ball

        // calculate impact point (0 means left edge, 1 means right edge)
        let impactPoint = (ballHorizontalPos - paddleLeft) / paddle.offsetWidth;

        // change angle based on impact point
        ballAngle = impactPoint > 0.5 ? (impactPoint - 0.5) * 2 : -(0.5 - impactPoint) * 2;
    }

    // update the position of the ball
    ball.style.top = (ballCurrentPos + ballSpeed * ballDirection).toFixed(2) + 'px';
    ball.style.left = (ballHorizontalPos + ballSpeed * ballAngle * ballHorizontalDirection).toFixed(2) + 'px';
}

// call updateBallPosition every 20 milliseconds
setInterval(updateBallPosition, 20);
