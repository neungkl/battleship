const shipType = require('./ship.type');
const dirType = require('./direction.type');

class Ship {
  constructor(x, y, direction, type) {
    if (x == null || y == null) {
      throw new Error('X and Y shouldn\'t be empty');
    }

    if (direction !== dirType.DOWN && direction !== dirType.RIGHT) {
      throw new Error('Incorrect ship direction.');
    }

    switch (type) {
      case shipType.BATTLESHIP:
        this.length = 4;
        break;
      case shipType.CRUISER:
        this.length = 3;
        break;
      case shipType.DESTROYER:
        this.length = 2;
        break;
      case shipType.SUBMARINE:
        this.length = 1;
        break;
      default:
        throw new Error('Incorrect ship type.');
    }

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.type = type;
  }

  shipPositionList() {
    const position = [];

    for (let i = 0; i < this.length; i += 1) {
      const x = this.x + ((this.direction === dirType.RIGHT ? 1 : 0) * i);
      const y = this.y + ((this.direction === dirType.DOWN ? 1 : 0) * i);
      position.push([x, y]);
    }

    return position;
  }
}

module.exports = Ship;
