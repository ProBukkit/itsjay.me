const canvas = document.getElementById("gameCanvas");
canvas.width = 1600;
canvas.height = 900;

class Platform {
  constructor(canvas, width, height, x, y, speed) {
    this.canvas = canvas;
    this.context = canvas.context;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = "PLATFORM";
    this.speed = speed || 0;
  }
  render() {
    if (this.speed != 0) {
      this.x = (this.x + this.speed) % canvas.width;
    }
    //this is temporary until i find a good platform sprite.
    this.context.fillStyle = "green";
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const platform = new Platform(
  {
    width: canvas.width,
    height: canvas.height,
    context: canvas.getContext("2d")
  },
  canvas.width / 3,
  50,
  0,
  canvas.height - 50,
  5
);

const platform2 = new Platform(
  {
    width: canvas.width,
    height: canvas.height,
    context: canvas.getContext("2d")
  },
  300,
  10,
  200,
  400,
  4
);

const platform3 = new Platform(
  {
    width: canvas.width,
    height: canvas.height,
    context: canvas.getContext("2d")
  },
  300,
  10,
  200,
  600,
  7
);

const playerAnimation = new Image();
playerAnimation.src = "https://vgy.me/FsIqiv.png";

const player = new Sprite(
  canvas.getContext("2d"),
  935,
  364,
  playerAnimation,
  5,
  10,
  true,
  0,
  0
);

const quadTree = new QuadTree({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height
});

function detectCollision() {
  let objects = [];
  quadTree.getAllObjects(objects);

  for (let x = 0, len = objects.length; x < len; x++) {
    quadTree.findObjects((obj = []), objects[x]);
    for (let y = 0, length = obj.length; y < length; y++) {
      if (objects[x] != obj[y] && objects[x].type != "HERO") {
        const w = 0.5 * (objects[x].width + objects[y].width);
        const h = 0.5 * (objects[x].height + objects[y].height);
        const dx =
          objects[x].x +
          0.5 * objects[x].width -
          (objects[y].x + 0.5 * objects[y].width);
        const dy =
          objects[x].y +
          0.5 * objects[x].height -
          (objects[y].y + 0.5 * objects[y].height);

        if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
          const wy = w * dy;
          const hx = h * dx;

          if (objects[y].type == "HERO" && objects[x].type == "PLATFORM") {
            if (wy > hx) {
              if (wy > -hx) {
                //top
                objects[y].y = objects[x].y - objects[y].height - 1;
                objects[y].onGround = true;
                objects[y].platform = {
                  centerx: objects[x].x + 0.5 * objects[x].width,
                  width: objects[x].width,
                  time: Date.now(),
                  speed: objects[x].speed
                };
                objects[y].gravitySpeed = 0;
                objects[y].jumping = false;
              } else {
                //left
                if (objects[y].horizontalAcceleration < 0)
                  objects[y].horizontalAcceleration = 0;
              }
            } else if (wy > -hx) {
              //right
              if (objects[y].horizontalAcceleration > 0)
                objects[y].horizontalAcceleration = 0;
            } else {
              objects[y].moveTo(objects[y].x, objects[x].y + objects[x].height);
              objects[y].gravitySpeed = -objects[y].gravitySpeed;
              //bottom
            }
          }
        }
      }
    }
  }
}

document.onkeypress = function(e) {
  switch (e.keyCode) {
    case 97:
      player.moving = true;
      player.horizontalAcceleration = -10;
      break;
    case 100:
      player.moving = true;
      player.horizontalAcceleration = 10;
      break;
    case 32:
      if (!player.jumping && player.onGround) {
        player.jump();
      }
      break;
  }
};

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      player.moving = true;
      player.horizontalAcceleration = -10;
      break;
    case 39:
      player.moving = true;
      player.horizontalAcceleration = 10;
      break;
  }
};

document.onkeyup = function(e) {
  switch (e.keyCode) {
    case 65:
    case 37:
      player.moving = false;
      break;
    case 39:
    case 68:
      player.moving = false;
      break;
  }
};

let stop = false;
let fpsInterval, startTime, now, then, elapsed;

fpsInterval = 1000 / 60;
then = Date.now();
startTime = then;

function gameLoop() {
  if (stop) {
    return;
  }

  window.requestAnimationFrame(gameLoop);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - elapsed % fpsInterval;
    quadTree.clear();
    quadTree.insert(player);
    quadTree.insert(platform);
    quadTree.insert(platform2);
    quadTree.insert(platform3);
    //you can also insert array of objects..
    detectCollision();

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.render();
    platform.render();
    platform2.render();
    platform3.render();
  }
}
gameLoop();
