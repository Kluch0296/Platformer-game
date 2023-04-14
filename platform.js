const platformImage = new Image();
platformImage.src = "platform.png"; // Замените на путь к вашему изображению платформы

export class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.drawImage(platformImage, this.x, this.y, this.width, this.height);
  }
}

export class TrapPlatform extends Platform {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.trapActive = false;
  }

  activateTrap() {
    this.trapActive = true;
    setTimeout(() => {
      this.trapActive = false;
    }, 1000);
  }

  draw(context) {
    if (this.trapActive) {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.width, this.height);
    } else {
      context.drawImage(platformImage, this.x, this.y, this.width, this.height);
    }
  }

  checkCollisionWithHero(hero) {
    if (this.trapActive && hero.collidesWithTopOfPlatform(this)) {
      return true;
    }
    return false;
  }
}
