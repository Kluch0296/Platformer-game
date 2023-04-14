export class Hero {
  constructor(x, y, soundEnabled) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.speed = 5/1495*window.innerWidth;
    this.jumping = false;
    this.jumpHeight = 15;
    this.gravity = 0.8;
    this.velocity = 0;
    this.color = "blue";
    this.initialColor = "blue";
    this.dead = false;
    this.initialY = y;
    this.vy = 0; // Подпрыгивание
	this.initialJumpHeight = -15;
	this.initialDeathY = y;
	this.soundEnabled = soundEnabled
  }
  
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  collidesWithPlatform(platform) {
    const futureX = this.x + this.speed;
    const futureY = this.y + this.velocity;
  
    return (
      futureX < platform.x + platform.width &&
      futureX + this.width > platform.x &&
      futureY < platform.y + platform.height &&
      futureY + this.height > platform.y
    );
  }

  collidesWithTopOfPlatform(platform) {
    const futureX = this.x;
    const futureY = this.y + this.velocity;

    return (
      futureX < platform.x + platform.width &&
      futureX + this.width > platform.x &&
      futureY + this.height > platform.y &&
      futureY + this.height <= platform.y + this.velocity
    );
  }

  collidesWithBug(bug) {
    return (
      this.x < bug.x + bug.width &&
      this.x + this.width > bug.x &&
      this.y < bug.y + bug.height &&
      this.y + this.height > bug.y
    );
  }

  die(callback) {
    if (!this.dead) {
      this.dead = true;
      this.vy = this.initialJumpHeight;

      const jumpAnimation = setInterval(() => {
        this.y += this.vy;
        this.vy += this.gravity;

        if (this.y >= this.initialDeathY) {
          clearInterval(jumpAnimation);
          this.y = this.initialDeathY;
          callback();
        }
      }, 1000 / 60);
    }
  }


  update(keys, canvas, platforms) {
    // Реализация движения и прыжков героя
	const jumpSound = document.getElementById("jump-sound");
	if (!this.dead) {
      if (keys["a"] || keys["A"]) {
        this.x = Math.max(0, this.x - this.speed);
      }
      if (keys["d"] || keys["D"]) {
        this.x = Math.min(canvas.width - this.width, this.x + this.speed);
      }

      if (keys[" "] && !this.jumping) {
        this.jumping = true;
        this.velocity = -this.jumpHeight;
		if (this.soundEnabled) {
          jumpSound.play();
        }
      }
    

      this.velocity += this.gravity;
      let newY = this.y + this.velocity;
      let onPlatform = false;

      platforms.forEach((platform) => {
        if (this.collidesWithTopOfPlatform(platform)) {
          newY = platform.y - this.height;
          onPlatform = true;
        }
      });

      if (onPlatform) {
        this.y = newY;
        this.jumping = false;
        this.velocity = 0;
      } else {
        this.y = newY;
        this.jumping = true;
      }
	}
  }
}

export default Hero;
