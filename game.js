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
const door = { x: 220, y: 140, width: 60, height: 60 };

// ELMASLAR
const gems = [
  { x: 200, y: 120 },
  { x: 260, y: 120 }
];

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
  solar = { x: 50, y: 200, vy: 0 };
  pobmek = { x: 100, y: 200, vy: 0 };
}

// OYUN LOOP
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ARKA PLAN
  ctx.fillStyle = "#3b3b1f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // gravity
  solar.vy += gravity;
  pobmek.vy += gravity;

  solar.y += solar.vy;
  pobmek.y += pobmek.vy;

  // zemin
  if (solar.y > 250) { solar.y = 250; solar.vy = 0; }
  if (pobmek.y > 250) { pobmek.y = 250; pobmek.vy = 0; }

  // platform
  if (collide(solar, platform)) {
    solar.y = platform.y - 40;
    solar.vy = 0;
  }
  if (collide(pobmek, platform)) {
    pobmek.y = platform.y - 40;
    pobmek.vy = 0;
  }

  // PLATFORM ÇİZ
  ctx.fillStyle = "#8b7d5c";
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

  // WATER
  ctx.fillStyle = "#4fc3f7";
  ctx.fillRect(water.x, water.y, water.width, water.height);

  // FIRE
  ctx.fillStyle = "#ff7043";
  ctx.fillRect(fire.x, fire.y, fire.width, fire.height);

  // DOOR
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(door.x, door.y, door.width, door.height);

  // ELMAS
  ctx.font = "20px Arial";
  gems.forEach(g => {
    ctx.fillText("💎", g.x, g.y);
  });

  // KARAKTERLER (EMOJİ)
  ctx.font = "30px Arial";
  ctx.fillText("🌞", solar.x, solar.y + 30);
  ctx.fillText("☁️", pobmek.x, pobmek.y + 30);

  // ÖLME
  if (collide(solar, water)) reset("Solar died!");
  if (collide(pobmek, fire)) reset("Pobmek died!");

  // KAZANMA
  if (collide(solar, door) && collide(pobmek, door)) {
    alert("Congratulations! 🎉\nShare your achievement!\nDon't forget to watch Love You Teacher 💖");
    reset("Play again");
  }

  requestAnimationFrame(game);
}

game();
