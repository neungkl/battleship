const chai = require('chai');
const Ship = require('./ship');
const dirType = require('./type/direction.type');
const shipType = require('./type/ship.type');
const Vector2 = require('./vector2');

const expect = chai.expect;

const vec = (x, y) => new Vector2(x, y);

describe('Ship', () => {
  describe('constructor', function() {
    it('should throw error when not given X and Y', function() {
      const fn = (x, y) => {
        return function() {
          new Ship(x, y, dirType.DOWN, shipType.BATTLESHIP);
        };
      };

      expect(fn(null, null)).to.throw();
      expect(fn(undefined, null)).to.throw();
      expect(fn(undefined, 1)).to.throw();
      expect(fn(1, undefined)).to.throw();
    });

    it('should throw error when direction is incorrect', function() {
      const fn = dir => {
        return function() {
          new Ship(1, 1, dir, shipType.BATTLESHIP);
        };
      };

      expect(fn('up')).to.throw();
      expect(fn('left')).to.throw();
    });

    it('should not throw error when direction is correct', function() {
      const fn = dir => {
        return function() {
          new Ship(1, 1, dir, shipType.BATTLESHIP);
        };
      };

      expect(fn(dirType.DOWN)).to.not.throw();
      expect(fn(dirType.RIGHT)).to.not.throw();
    });

    it('should throw error when ship is incorrect', function() {
      const fn = dir => {
        return function() {
          new Ship(1, 1, dir, shipType.BA);
        };
      };

      expect(fn('abcdef')).to.throw();
      expect(fn('hhhhh')).to.throw();
    });

    it('should not throw error when ship is correct', function() {
      const fn = type => {
        return function() {
          new Ship(1, 1, dirType.DOWN, type);
        };
      };

      expect(fn(shipType.BATTLESHIP)).to.not.throw();
      expect(fn(shipType.CRUISER)).to.not.throw();
      expect(fn(shipType.DESTROYER)).to.not.throw();
      expect(fn(shipType.SUBMARINE)).to.not.throw();
    });
  });

  describe('cellList', function() {
    it('should return correct list of ship position', function() {
      let ship = new Ship(1, 1, dirType.DOWN, shipType.BATTLESHIP);
      expect(ship.positionList()).to.deep.equal([
        vec(1, 1),
        vec(1, 2),
        vec(1, 3),
        vec(1, 4)
      ]);
    });

    it('should return correct list of ship position', function() {
      let ship = new Ship(3, 1, dirType.RIGHT, shipType.CRUISER);
      expect(ship.positionList()).to.deep.equal([
        vec(3, 1),
        vec(4, 1),
        vec(5, 1)
      ]);
    });

    it('should return correct list of ship position', function() {
      let ship = new Ship(5, 2, dirType.RIGHT, shipType.SUBMARINE);
      expect(ship.positionList()).to.deep.equal([vec(5, 2)]);
    });
  });

  describe('isInBoardArea', function() {

    it('should return false when ship is out of area', function() {
      let shipA = new Ship(-1, 1, dirType.RIGHT, shipType.BATTLESHIP);

      expect(shipA.isInBoardArea(10)).to.be.true;
    });

    it('should return false when ship is out of area', function() {
      let shipA = new Ship(7, 1, dirType.RIGHT, shipType.BATTLESHIP);

      expect(shipA.isInBoardArea(10)).to.be.true;
    });

    it('should return false when ship is out of area', function() {
      let shipA = new Ship(10, 10, dirType.DOWN, shipType.SUBMARINE);

      expect(shipA.isInBoardArea(5)).to.be.true;
    });

    it('should return true when ship is in area', function() {
      let shipA = new Ship(5, 5, dirType.DOWN, shipType.BATTLESHIP);

      expect(shipA.isInBoardArea(10)).to.be.true;
    });

    it('should return true when ship is in area', function() {
      let shipA = new Ship(0, 0, dirType.RIGHT, shipType.BATTLESHIP);

      expect(shipA.isInBoardArea(10)).to.be.true;
    });

  });

  describe('collideWith', function() {
    it('should return true when ship is close together', function() {
      let shipA = new Ship(1, 1, dirType.RIGHT, shipType.BATTLESHIP);
      let shipB = new Ship(1, 2, dirType.RIGHT, shipType.DESTROYER);

      expect(shipA.collideWith(shipB)).to.be.true;
    });

    it('should return true when ship is close together', function() {
      let shipA = new Ship(1, 1, dirType.RIGHT, shipType.BATTLESHIP);
      let shipB = new Ship(4, 2, dirType.DOWN, shipType.DESTROYER);

      expect(shipA.collideWith(shipB)).to.be.true;
    });

    it('should return true when ship is close together', function() {
      let shipA = new Ship(3, 3, dirType.RIGHT, shipType.SUBMARINE);
      let shipB = new Ship(4, 4, dirType.RIGHT, shipType.SUBMARINE);

      expect(shipA.collideWith(shipB)).to.be.true;
    });

    it('should return true when ship is close together', function() {
      let shipA = new Ship(1, 3, dirType.RIGHT, shipType.BATTLESHIP);
      let shipB = new Ship(3, 1, dirType.DOWN, shipType.BATTLESHIP);

      expect(shipA.collideWith(shipB)).to.be.true;
    });

    it('should return true when ship is close together', function() {
      let shipA = new Ship(1, 1, dirType.RIGHT, shipType.CRUISER);
      let shipB = new Ship(4, 1, dirType.RIGHT, shipType.CRUISER);

      expect(shipA.collideWith(shipB)).to.be.true;
    });

    it('should return false when ship is not close together', function() {
      let shipA = new Ship(1, 1, dirType.RIGHT, shipType.BATTLESHIP);
      let shipB = new Ship(1, 3, dirType.DOWN, shipType.BATTLESHIP);

      expect(shipA.collideWith(shipB)).to.be.false;
    });

    it('should return false when ship is not close together', function() {
      let shipA = new Ship(1, 1, dirType.DOWN, shipType.BATTLESHIP);
      let shipB = new Ship(3, 1, dirType.DOWN, shipType.BATTLESHIP);

      expect(shipA.collideWith(shipB)).to.be.false;
    });

    it('should return false when ship is not close together', function() {
      let shipA = new Ship(1, 1, dirType.RIGHT, shipType.CRUISER);
      let shipB = new Ship(5, 1, dirType.RIGHT, shipType.CRUISER);

      expect(shipA.collideWith(shipB)).to.be.false;
    });

    it('should return false when ship is not close together', function() {
      let shipA = new Ship(1, 1, dirType.DOWN, shipType.CRUISER);
      let shipB = new Ship(3, 3, dirType.RIGHT, shipType.SUBMARINE);

      expect(shipA.collideWith(shipB)).to.be.false;
    });
  });
});
