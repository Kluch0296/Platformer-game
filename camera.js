export class Camera {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(hero, canvas) {
    if (!hero.dead) { // Если герой не мертв, обновляем камеру
      this.x = Math.min(
        Math.max(hero.x - canvas.width / 10, 0),
        canvas.width - 800
      );
    }
  }
}

export default Camera;
