console.log("Mr. Singh");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gulpSound = new Audio("gulp.mp3");
const backSound = new Audio("snake_music.mp3");
const gameOverSound = new Audio("gameOver.wav");
let highScore = document.getElementById("highScore"); /////
let currentScore = document.getElementById("currentScore");
let high = 0;


let highScoreC = sessionStorage.getItem("high");


console.log("new", highScoreC);

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 5;
let tileCount = 23;
let headX = Math.floor((Math.random() * tileCount));;
let headY = Math.floor((Math.random() * tileCount));;
const snakeParts = [];
let tailLength = 2;
let foodX = Math.floor((Math.random() * tileCount));;
let foodY = Math.floor((Math.random() * tileCount));;
let tileSize = canvas.width / tileCount - 2;
console.log(tileSize);
//game loop
let score = 0; ////////
let xVelocity = 0;
let yVelocity = 0;
function drawGame() {
    console.log('draw');
    backSound.play();
    changeSnakePosition();
    let result = isGameOver();
    if (result) return;

    clearScreen();

    checkFoodCollision();

    drawScore();
    if (score > 4) {
        speed = 5;
    }
    if (score > 10) {
        speed = 7;
    }
    if (score > 15) {
        speed = 9
    }
    if (score > 20) {
        speed = 11
    }
    if (score > 25) {
        speed = 13
    }
    drawFood();
    drawSnake();
    highScoreSet();
    setTimeout(drawGame, 1000 / speed);
}


let try1 = document.querySelector(".try");
function isGameOver() {
    let gameOver = false;
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    //walls
    if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
        backSound.pause();
        gameOverSound.play();
        // function gameDone() {
        //     gameOver = true;
        // }

        // setTimeout(gameDone, 1000);
        gameOver = true;
    }

    //snake collision check
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            if (gameOver) {
                backSound.pause();
                gameOverSound.play();
            }
            break;
        }
    }

    // function gameGone() {
    //     ctx.fillStyle = 'yellow';
    //     ctx.fillRect(canvas.width / 3, canvas.height / 3, 200, 200);
    // }

    if (gameOver) {
        //setTimeout(gameGone, 2000);
        ctx.fillStyle = "white";
        ctx.font = '60px Verdana';
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", " magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient

        ctx.fillStyle = gradient;
        setTimeout(ctx.fillText("GAME OVER!!", canvas.width / 7.5, canvas.height / 2), 1000);

        //head1.classList.add("active");
        try1.classList.add("active");
    }
    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    // ctx.fillStyle = 'white';
    // ctx.font = '10px Verdana';
    // ctx.fillText("Score " + score, canvas.width - 50, 10);
    currentScore.textContent = score;
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

    ctx.fillStyle = 'red';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}


function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawFood() {
    ctx.fillStyle = 'aqua';
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function highScoreSet() {
    if (!highScoreC && score == 0) {
        highScore.textContent = high;
    }
    else if (score > highScoreC) { highScore.textContent = score; }
    else {
        highScore.textContent = highScoreC;
    }

}

function checkFoodCollision() {
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor((Math.random() * tileCount));
        foodY = Math.floor((Math.random() * tileCount));
        tailLength++;
        score++;
        let check = score;

        sessionStorage.setItem("high", Math.max(check, highScoreC));

        gulpSound.play();
    }


}
document.body.addEventListener('keydown', keyDown);

//buttons controls
// let up1 = document.querySelector(".btn-up");
// let down1 = document.querySelector(".btn-down");
// let left1 = document.querySelector(".btn-left");
// let right1 = document.querySelector(".btn-right");

// up1.addEventListener("click", (e) => {
//     console.log("clicked");
//     e.which = 38;
//     if (yVelocity == 1) return;
//     yVelocity = -1;
//     xVelocity = 0;
// })

// down1.addEventListener("click", (e) => {
//     console.log("clicked");
//     e.which = 40;
//     if (yVelocity == -1) return;
//     yVelocity = 1;
//     xVelocity = 0;
// })

// left1.addEventListener("click", (e) => {
//     console.log("clicked");
//     e.which = 40;
//     if (xVelocity == 1) return;
//     yVelocity = 0;
//     xVelocity = -1;
// })

// right1.addEventListener("click", (e) => {
//     console.log("clicked");
//     e.which = 39;
//     yVelocity = 0;
//     if (xVelocity == -1) return;
//     xVelocity = 1;
// })

//////////////////////////////////
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
    if (e.keyCode == 32) {
        yVelocity = 0;
        xVelocity = 0;
    }
}

try1.addEventListener("click", () => {
    window.location.reload();
})

// const createIconHtml = (icon_name) => {
//     return `<i class="material-icons">${icon_name}</i>`
// };
// let pa = document.getElementById("para");
// pa.innerHTML = createIconHtml("keyboard_return");

drawGame();
//three ways
//1. requestanimationframe
//2. setInterval
//3. setTimeout