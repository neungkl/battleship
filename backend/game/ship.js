const shipType = require('./type/ship.type');
const dirType = require('./type/direction.type');
const Vector2 = require('./vector2');

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

  positionList() {
    const position = [];

    for (let i = 0; i < this.length; i += 1) {
      const x = this.x + ((this.direction === dirType.RIGHT ? 1 : 0) * i);
      const y = this.y + ((this.direction === dirType.DOWN ? 1 : 0) * i);
      position.push(new Vector2(x, y));
    }

    return position;
  }

  isInBoardArea(boardSize) {
    const positions = this.positionList();
    for (let i = 0; i < positions; i += 1) {
      const pos = positions[i];
      if (pos.x < 0 || pos.y < 0 || pos.x >= boardSize || pos.y >= boardSize) {
        return false;
      }
    }
    return true;
  }

  // Check position of current ship. Isn't it near to other ship position.
  collideWith(otherShip) {
    const curPos = this.positionList();
    const otherPos = otherShip.positionList();

    for (let i = 0; i < curPos.length; i += 1) {
      for (let j = 0; j < otherPos.length; j += 1) {
        if (curPos[i].isNearPosition(otherPos[j])) return true;
      }
    }

    return false;
  }
}

module.exports = Ship;
