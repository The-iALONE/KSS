// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// مشخصات توپ
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 3; 
let ballDY = 3;
const ballRadius = 10;

// مشخصات بازیکن‌ها
const paddleHeight = 10;
const paddleWidth = 100;
let paddle1X = (canvas.width - paddleWidth) / 2;
let paddle2X = (canvas.width - paddleWidth) / 2;

// امتیازات بازیکنان
let player1Score = 0;
let player2Score = 0;

// کنترل‌ها
let leftPressed = false;
let rightPressed = false;

let aPressed = false;
let dPressed = false;

// رسم اجزای بازی
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawGoals() {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, 10); // دروازه بالا
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10); // دروازه پایین
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // رسم توپ، پدال‌ها و دروازه‌ها
    drawBall();
    drawPaddle(paddle1X, 0); // بازیکن 1 (بالا)
    drawPaddle(paddle2X, canvas.height - paddleHeight); // بازیکن 2 (پایین)
    drawGoals();
}

function update() {
    ballX += ballDX;
    ballY += ballDY;

    // برخورد توپ به دیواره‌های چپ و راست
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballDX = -ballDX;
    }

    // برخورد توپ به بازیکن‌ها
    if (
        (ballY - ballRadius < paddleHeight && ballX > paddle1X && ballX < paddle1X + paddleWidth) || 
        (ballY + ballRadius > canvas.height - paddleHeight && ballX > paddle2X && ballX < paddle2X + paddleWidth)
    ) {
        ballDY = -ballDY;
    }

    // ورود توپ به دروازه‌ها
    if (ballY - ballRadius < 0) {
        player2Score++;
        resetBall();
    }
    if (ballY + ballRadius > canvas.height) {
        player1Score++;
        resetBall();
    }

    // حرکت بازیکن‌ها
    if (leftPressed && paddle1X > 0) paddle1X -= 5;
    if (rightPressed && paddle1X < canvas.width - paddleWidth) paddle1X += 5;

    if (aPressed && paddle2X > 0) paddle2X -= 5;
    if (dPressed && paddle2X < canvas.width - paddleWidth) paddle2X += 5;

    // بروزرسانی امتیاز
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;

    draw();
    requestAnimationFrame(update);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballDX = (Math.random() > 0.5 ? 1 : -1) * 3;
    ballDY = (Math.random() > 0.5 ? 1 : -1) * 3;
}

// کنترل کلیدها
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'ArrowRight') rightPressed = true;
    if (e.key === 'a') aPressed = true;
    if (e.key === 'd') dPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = false;
    if (e.key === 'ArrowRight') rightPressed = false;
    if (e.key === 'a') aPressed = false;
    if (e.key === 'd') dPressed = false;
});

// شروع بازی
document.getElementById('startBtn').addEventListener('click', () => requestAnimationFrame(update));

// ریست بازی
document.getElementById('resetBtn').addEventListener('click', () => {
    player1Score = 0;
    player2Score = 0;
    resetBall();
    draw();
});

// اولین رسم
draw();
