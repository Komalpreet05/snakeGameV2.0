console.log("Mr. Singh");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;
let foodX = 5;
let foodY = 5;
let tileSize = canvas.width / tileCount - 2;
//game loop
let score = 0;
let xVelocity = 0;
let yVelocity = 0;
function drawGame() {
    console.log('draw');
    changeSnakePosition();
    let result = isGameOver();
    if (result) return;

    clearScreen();

    checkFoodCollision();
    drawScore();
    drawFood();
    drawSnake();
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    //walls
    if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
        gameOver = true;
    }

    //snake collision check
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }


    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = '50px Verdana';
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillText("GAME OVER!!", canvas.width / 10.5, canvas.height / 2);
    }
    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}


function drawSnake() {


    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}


function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}
function checkFoodCollision() {
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor((Math.random() * tileCount));
        foodY = Math.floor((Math.random() * tileCount));
        tailLength++; score++;
    }
}
document.body.addEventListener('keydown', keyDown);

function keyDown(e) {
    //up
    if (e.keyCode == 38) {
        if (yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if (e.keyCode == 40) {
        if (yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //down
    if (e.keyCode == 37) {
        if (xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    } //down
    if (e.keyCode == 39) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
//three ways
//1. requestanimationframe
//2. setInterval
//3. setTimeout