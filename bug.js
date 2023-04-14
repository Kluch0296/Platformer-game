export class Bug {
  constructor(platform, speed) {
    this.width = 32/1495*window.innerWidth;
    this.height = 32/1495*window.innerWidth;
    this.x = platform.x;
    this.y = platform.y - this.height; // Жук будет расположен сверху от платформы
    this.speed = speed;
    this.platform = platform; // Сохраняем ссылку на платформу
  }



  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.speed;

    if (this.x <= this.platform.x || this.x + this.width >= this.platform.x + this.platform.width) {
      this.speed = -this.speed;
    }
  }

}

export default Bug;
