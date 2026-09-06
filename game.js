const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 1, y: 1 };
let monster = { x: 14, y: 9 };

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePlayer() {
    let nx = player.x;
    let ny = player.y;

    if (keys["w"]) ny--;
    if (keys["s"]) ny++;
    if (keys["a"]) nx--;
    if (keys["d"]) nx++;

    if (maze[ny] && maze[ny][nx] === 0) {
        player.x = nx;
        player.y = ny;
    }
}

function moveMonster() {
    // simple chase AI
    let dx = player.x - monster.x;
    let dy = player.y - monster.y;

    if (Math.abs(dx) > Math.abs(dy)) {
        monster.x += Math.sign(dx);
    } else {
        monster.y += Math.sign(dy);
    }

    // prevent walking through walls
    if (maze[monster.y][monster.x] === 1) {
        monster.x -= Math.sign(dx);
        monster.y -= Math.sign(dy);
    }
}

function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? "#222" : "#000";
            ctx.fillRect(x*TILE, y*TILE, TILE, TILE);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(player.x*TILE+20, player.y*TILE+20, 15, 0, Math.PI*2);
    ctx.fill();
}

function drawMonster() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(monster.x*TILE+20, monster.y*TILE+20, 20, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillRect(monster.x*TILE+10, monster.y*TILE+10, 10, 10);
    ctx.fillRect(monster.x*TILE+30, monster.y*TILE+10, 10, 10);
    ctx.fillRect(monster.x*TILE+15, monster.y*TILE+30, 20, 5);
}

function checkDeath() {
    if (player.x === monster.x && player.y === monster.y) {
        alert("THE SMILEY GOT YOU");
        location.reload();
    }
}

function loop() {
    movePlayer();
    moveMonster();

    ctx.clearRect(0,0,640,640);

    drawMaze();
    drawPlayer();
    drawMonster();
    checkDeath();

    requestAnimationFrame(loop);
}

loop();
