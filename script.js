const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// ctx.fillRect(0, 0, 50, 40); //(x,y,w,h)

let square = 50;
var snakecell = [[0, 0]];
let bheight = 500;
let bwidth = 1000;
let direction = "right";
let gameOver = false;
let foodG = generateRandomcell();
let score = 0;

document.addEventListener("keydown", function (e) {
  // console.log(e)

  if (e.key === "ArrowRight") {
    direction = "right";
  } else if (e.key === "ArrowLeft") {
    direction = "left";
  } else if (e.key === "ArrowDown") {
    direction = "down";
  } else {
    direction = "up";
  }
});

function update() {
  ctx.clearRect(0, 0, bwidth, bheight);

  headx = snakecell[snakecell.length - 1][0];
  heady = snakecell[snakecell.length - 1][1];
  if (direction === "right") {
    newx = headx + square;
    newy = heady;
    if (newx === bwidth) {
      gameOver = true;
    }
  } else if (direction === "down") {
    newx = headx;
    newy = heady + square;
    if (newy === bheight) {
      gameOver = true;
    }
  } else if (direction === "left") {
    newx = headx - square;
    newy = heady;
    if (newx < 0) {
      gameOver = true;
    }
  } else {
    newx = headx;
    newy = heady - square;
    if (newy < 0) {
      gameOver = true;
    }
  }
  snakecell.push([newx, newy]);
  if (newx === foodG[0] && newy === foodG[1]) {
    foodG = generateRandomcell();
    score += 1;
  } else {
    snakecell.shift();
  }
}

function generateRandomcell() {
  return [
    Math.round((Math.random() * (bwidth - square)) / square) * square,
    Math.round((Math.random() * (bheight - square)) / square) * square,
  ];
}

function draw() {
  ctx.fillStyle = "aqua";
  if (gameOver === true) {
    ctx.fillStyle = "grey";
    clearInterval(id);
    ctx.font = "40px Arial";
    ctx.fillText(`Game Over`, 400, 220);
    ctx.fillText(`Score : ${score}`, 420, 270);
    return;
  }
  for (const cell of snakecell) {
    ctx.fillRect(cell[0], cell[1], square, square);
  }
  ctx.fillStyle = "black";
  ctx.fillRect(foodG[0], foodG[1], square, square);
  ctx.fillText(`Score : ${score}`, 20, 20);
  ctx.font = "25px Arial";
}

let id = setInterval(function () {
  update();
  draw();
}, 100);
