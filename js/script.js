// Game Constants & Variables

let inputVeloDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let lastPaintTime = 0
let speed = 3;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
]


food = { x: Math.round(15 * Math.random()), y: Math.round(17 * Math.random()) }


// Game Functions
function main(crntime) {
    window.requestAnimationFrame(main);
    if ((crntime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    // console.log(crntime)
    lastPaintTime = crntime;
    gameEngine();
}

// Game Engine
function isCollide(snake) {
    // if you bump into our self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;

}

function gameEngine() {
    // Part 1: Updating the snake array and food


    if (isCollide(snakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        inputVeloDir = { x: 0, y: 0 };
        alert("Game Over ! Press the Enter key to Play Again !!")
        snakeArr = [{ x: 13, y: 15 }]
        musicSound.play();
        score = 0;
    }
    // if snake eaten the food, increase the score and regenerates the food 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputVeloDir.x, y: snakeArr[0].y + inputVeloDir.y });


        // Speed Increases 
        if (score++) {
            speed = speed + .25;
        }
        let a = 2;
        let b = 16;

        speedBox.innerHTML = Math.floor(speed);

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }


    }

    // Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }
    snakeArr[0].x += inputVeloDir.x;
    snakeArr[0].y += inputVeloDir.y;

    // Part 2: Displaying the snake and food

    //Display snake1
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    });

    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    foodElement.classList.add('food')
    board.appendChild(foodElement)

}

// Main Logic Starts Here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}




window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputVeloDir = { x: 0, y: 1 } // Start the Game
    musicSound.play();
    moveSound.play();
    switch (e.key) {

        case "ArrowUp":
            inputVeloDir.x = 0;
            inputVeloDir.y = -1;
            break;
        case "ArrowDown":
            inputVeloDir.x = 0;
            inputVeloDir.y = 1;
            break;
        case "ArrowLeft":
            inputVeloDir.x = -1;
            inputVeloDir.y = 0;
            break;
        case "ArrowRight":
            inputVeloDir.x = 1;
            inputVeloDir.y = 0;
            break;

        default:
            break;
    }
})