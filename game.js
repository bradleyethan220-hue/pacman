const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let pac = { x: 300, y: 300, speed: 3 };
let ghost = { x: 100, y: 100 };

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePac() {
    if (keys["ArrowUp"]) pac.y -= pac.speed;
    if (keys["ArrowDown"]) pac.y += pac.speed;
    if (keys["ArrowLeft"]) pac.x -= pac.speed;
    if (keys["ArrowRight"]) pac.x += pac.speed;
}

function moveGhost() {
    // ghost teleports randomly
    if (Math.random() < 0.01) {
        ghost.x = Math.random() * 600;
        ghost.y = Math.random() * 600;
    }

    // ghost slowly follows pac
    ghost.x += (pac.x - ghost.x) * 0.01;
    ghost.y += (pac.y - ghost.y) * 0.01;
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 600, 600);

    // Pac-Man
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(pac.x, pac.y, 15, 0, Math.PI * 2);
    ctx.fill();

    // Ghost
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, 20, 0, Math.PI * 2);
    ctx.fill();
}

function checkDeath() {
    const dx = pac.x - ghost.x;
    const dy = pac.y - ghost.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 25) {
        triggerJumpscare();
    }
}

function triggerJumpscare() {
    document.getElementById("jumpscare").classList.add("show");
    setTimeout(() => {
        alert("THANK YOU FOR PLAYING");
    }, 1500);
}

function gameLoop() {
    movePac();
    moveGhost();
    draw();
    checkDeath();
    requestAnimationFrame(gameLoop);
}

gameLoop();
