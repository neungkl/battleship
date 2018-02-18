class Vector2 {
  constructor(x, y) {
    if (x == null || y == null) {
      throw new Error('X and Y shouldn\'t be empty');
    }

    this.x = x;
    this.y = y;
  }

  isNearPosition(vecB) {
    if (!(vecB instanceof Vector2)) {
      throw new Error('Another vector should be Vector2');
    }

    return (Math.abs(this.x - vecB.x) <= 1) && (Math.abs(this.y - vecB.y) <= 1);
  }
}

module.exports = Vector2;
