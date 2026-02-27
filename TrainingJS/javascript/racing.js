let size =20;
let defaultSpeed=20;
let score=0;
let gameInterval=null;
const canvas = document.getElementById("gameCanvas");
document.getElementById("gameCanvas").width=size*40;
document.getElementById("gameCanvas").height=size*20;
let trap=[];
let roadLines=[];
let timer=0;
let trapInterval=1000;

let timer2=0;
let roadLineInterval=500;
let pad=0;
const lane=[0-pad,canvas.height*1/8-pad,canvas.height*1/4-pad,canvas.height*3/8-pad,canvas.height*1/2-pad,canvas.height*5/8-pad,canvas.height*3/4-pad,canvas.height*7/8-pad];
const roadLine=[canvas.height/4,canvas.height*3/4];
function randomLane() {
    return lane[Math.floor(Math.random() * lane.length)];
}

function placeTrap(){
    trap.push({
        x: (canvas.width),        
        y: randomLane(),
        speed: 4+score*0.2,
        width: canvas.height/8+10,
        height: canvas.height/8
    });
}
function placeRoadLine(){
    roadLineInterval = Math.max(200, 500 - score * 5);
    roadLines.push({
        x: (canvas.width),        
        y: roadLine[0],
        speed: 4+score*0.2,
        width: canvas.height/8,
        height: 5
    });
    roadLines.push({
        x: (canvas.width),        
        y: roadLine[1],
        speed: 4+score*0.2,
        width: canvas.height/8,
        height: 5
    });
}

function updateTrap() {
    trapInterval = Math.max(500, 1000 - score * 10);
    trap.forEach(t => {
        t.x -= t.speed;
    });
    let beforeLength = trap.length;
    trap = trap.filter(t => t.x + t.width > 0);
    score += beforeLength - trap.length;
}
function updateLine() {
    roadLines.forEach(r => {
        r.x -= r.speed;
    });
    roadLines = roadLines.filter(r => r.x + r.width > 0);
}

function updateRoad(){
    roadLines.forEach(r => {
        r.x -= r.speed;
    });
    roadLines = roadLines.filter(r => r.x + r.width > 0);
}
function startGame() {
    gameInterval = setInterval(gameLoop, defaultSpeed);
}

function updateGame() {
    clearInterval(gameInterval);
    startGame();
}
function resetGame() {
    clearInterval(gameInterval);

    trap = [];
    roadLines = [];
    score = 0;

    timer = 0;
    timer2 = 0;
    trapInterval = 1000;
    roadLineInterval = 500;

    currentLane = 3;

    car = {
        x: 10,
        y: lane[currentLane],
        width: canvas.height / 4,
        height: canvas.height / 8,
    };

    document.getElementById("scoreValue").innerText = score;
}
function beginGame() {
    resetGame();
    startGame();
}
function crashCheck() {
    for (let t of trap) {
        if (
            car.x < t.x + t.width &&
            car.x + car.width > t.x &&
            car.y < t.y + t.height &&
            car.y + car.height > t.y
        ) {
            alert("Game Over!");
            resetGame();
            startGame();
            return true;
        }
    }
    return false;
}
function gameLoop() {
    timer += defaultSpeed;
    timer2 += defaultSpeed; 

    if (timer >= trapInterval) {
        placeTrap();
        timer = 0;
    }
    if (timer2 >= roadLineInterval) {
        placeRoadLine();
        timer2 = 0;
    }
    updateTrap();
    updateLine();
    if (crashCheck()) return;

    document.getElementById("scoreValue").innerText = score;
    draw();
}
let car = {
    x: 10,
    y: lane[3],
    width: canvas.height/4,
    height: canvas.height/8,
}
function draw() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    roadLines.forEach(r => {
        ctx.fillRect(r.x, r.y, r.width, r.height);
    });
    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height/2, canvas.width,1);
    ctx.fillStyle = "red";
    trap.forEach(t => {
        ctx.fillRect(t.x, t.y, t.width, t.height);
    });
    ctx.fillStyle = "blue";
    ctx.fillRect(car.x, car.y, car.width, car.height);
}
let currentLane = 3;

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (currentLane > 0) {
                currentLane--;
                car.y = lane[currentLane];
            }
            break;

        case "ArrowDown":
            if (currentLane < lane.length - 1) {
                currentLane++;
                car.y = lane[currentLane];
            }
            break;

        case "ArrowLeft":
            car.x = Math.max(0, car.x - canvas.height / 8);
            break;

        case "ArrowRight":
            car.x = Math.min(
                canvas.width - car.width,
                car.x + canvas.height / 8
            );
            break;
    }
});

