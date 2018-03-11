class Sprite {
  constructor(
    context,
    width,
    height,
    image,
    frameCount,
    ticksPerFrame,
    loop,
    x,
    y
  ) {
    this.context = context;
    this.width = width / 5;
    this.width2 = width;
    this.height = height;
    this.image = image;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.frameCount = frameCount;
    this.ticksPerFrame = ticksPerFrame;
    this.loop = loop;
    this.x = x;
    this.y = y;
    this.type = "HERO";
    this.onGround = false;
    this.gravitySpeed = 0;
    this.gravityAcceleration = 0.75;
    this.jumping = false;
    this.horizontalAcceleration = 0;
    this.moving = false;
    this.platform = {};
  }
  render() {
    this.context.drawImage(
      this.image,
      this.frameIndex * this.width2 / this.frameCount,
      0,
      this.width2 / this.frameCount,
      this.height,
      this.x,
      this.y,
      this.width2 / this.frameCount,
      this.height
    );
  }
  acceleration() {
    if (!this.onGround) {
      this.gravitySpeed += this.gravityAcceleration;
      this.move(this.horizontalAcceleration, this.gravitySpeed);
    } else {
      if (!this.moving) {
        this.horizontalAcceleration = 0;
      }
      this.move(this.horizontalAcceleration, 0);
    }
  }
  jump() {
    this.gravitySpeed = -30;
    this.gravitySpeed += this.gravityAcceleration;
    this.move(0, this.gravitySpeed);
  }
  update() {
    this.acceleration();
    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frameCount - 1) {
        this.frameIndex++;
      } else if (this.loop) {
        this.frameIndex = 0;
      }
    }
  }
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  move(x, y) {
    if (this.onGround && y < 0) this.onGround = false;
    if (
      this.platform.centerx +
        this.platform.speed * (Date.now() - this.platform.time) / 1000 * 60 +
        this.platform.width / 2 <
        this.x ||
      this.platform.centerx +
        this.platform.speed * (Date.now() - this.platform.time) / 1000 * 60 -
        this.platform.width / 2 >
        this.x + this.width
    ) {
      this.onGround = false;
    }
    this.x += x;
    this.y += y;
  }
}
