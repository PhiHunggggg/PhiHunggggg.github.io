let size = 20;
let gameInterval;
document.getElementById("gameCanvas").width=size*20;
document.getElementById("gameCanvas").height=size*20;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let direction = {x: 0, y: 0};
let score = 0;
let defaultSpeed = 200; // Initial speed in milliseconds
function gameLoop() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        placeFood();
        score++;
        if(defaultSpeed > 50){
            defaultSpeed -= 10; // Increase speed by reducing the interval
        }else{
        defaultSpeed *= 0.9; // Increase speed by reducing the interval
        }
        document.getElementById("scoreValue").textContent = score;
        resetGame(); // Restart the game loop with the new speed
    } else {
        snake.pop();
    }
    if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("Game Over!");
        score = 0;
        document.getElementById("scoreValue").textContent = score;
        snake = [{x: 10, y: 10}];
        direction = {x: 0, y: 0};
    }
    draw();
}
function startGame() {
    gameInterval = setInterval(gameLoop, defaultSpeed);
}
function resetGame() {
    clearInterval(gameInterval);
    startGame();
}
function placeFood() {
    food = {
        x: Math.floor(Math.random() * size),
        y: Math.floor(Math.random() * size)
    };
}
function draw() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
}
document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if(direction.y === 1)
                {
                 break;
                }
            else{
            direction = {x: 0, y: -1};
            break;
            }
        case "ArrowDown":
            if(direction.y === -1)
                {
                 break;
                }            else{
            direction = {x: 0, y: 1};
            break;
            }
        case "ArrowLeft":
            if(direction.x === 1)
                {
                 break;
                }
            else{
            direction = {x: -1, y: 0};
            break;
            }
        case "ArrowRight":
            if(direction.x === -1)
                {
                 break;
                }
            else{
            direction = {x: 1, y: 0};
            break;
            }
    }
});

startGame();
