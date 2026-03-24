const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// KARAKTERLER
let solar = { x: 50, y: 200, vy: 0 };
let pobmek = { x: 100, y: 200, vy: 0 };

let gravity = 0.5;

// PLATFORM
const platform = { x: 150, y: 200, width: 200, height: 20 };

// TEHLİKE
const water = { x: 0, y: 260, width: 150, height: 40 };
const fire = { x: 350, y: 260, width: 150, height: 40 };

// KAPI
const door = { x: 220, y: 150, width: 60, height: 50 };

// KONTROL
function move(dir) {
  if (dir === "l1") solar.x -= 10;
  if (dir === "r1") solar.x += 10;
  if (dir === "l2") pobmek.x -= 10;
  if (dir === "r2") pobmek.x += 10;
}

function jump(p) {
  if (p === "1") solar.vy = -10;
  if (p === "2") pobmek.vy = -10;
}

// ÇARPIŞMA
function collide(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + 40 > b.x &&
    a.y < b.y + b.height &&
    a.y + 40 > b.y
  );
}

// RESET
function reset(msg) {
  alert(msg);
  solar.x = 50; solar.y = 200; solar.vy = 0;
  pobmek.x = 100; pobmek.y = 200; pobmek.vy = 0;
}

// OYUN
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  solar.vy += gravity;
  pobmek.vy += gravity;

  solar.y += solar.vy;
  pobmek.y += pobmek.vy;

  // ZEMİN
  if (solar.y > 250) { solar.y = 250; solar.vy = 0; }
  if (pobmek.y > 250) { pobmek.y = 250; pobmek.vy = 0; }

  // PLATFORM
  if (collide(solar, platform)) {
    solar.y = platform.y - 40;
    solar.vy = 0;
  }

  if (collide(pobmek, platform)) {
    pobmek.y = platform.y - 40;
    pobmek.vy = 0;
  }

  // ÇİZİM
  ctx.fillStyle = "gray";
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

  ctx.fillStyle = "blue";
  ctx.fillRect(water.x, water.y, water.width, water.height);

  ctx.fillStyle = "red";
  ctx.fillRect(fire.x, fire.y, fire.width, fire.height);

  ctx.fillStyle = "green";
  ctx.fillRect(door.x, door.y, door.width, door.height);

  ctx.fillStyle = "orange";
  ctx.fillRect(solar.x, solar.y, 40, 40);

  ctx.fillStyle = "cyan";
  ctx.fillRect(pobmek.x, pobmek.y, 40, 40);

  // ÖLME
  if (collide(solar, water)) reset("Solar died!");
  if (collide(pobmek, fire)) reset("Pobmek died!");

  // KAZANMA
  if (collide(solar, door) && collide(pobmek, door)) {
    alert("You win!");
    reset("Play again");
  }

  requestAnimationFrame(game);
}

game();
