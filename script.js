let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let speed = 5;
//gameloop
let tileCount = 25
function drawGame() {
    clearScreen();
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

drawGame();