const chai = require('chai');
const Ship = require('./ship');
const dirType = require('./direction.type');
const shipType = require('./ship.type');

const expect = chai.expect;

describe('Ship', () => {
  describe('constructor', function() {
    it('should throw error when not given X and Y', function() {
      const fn = (x, y) => {
        return function() {
          new Ship(x, y, dirType.DOWN, shipType.BATTLESHIP);
        }
      }

      expect(fn(null, null)).to.throw();
      expect(fn(undefined, null)).to.throw();
      expect(fn(undefined, 1)).to.throw();
      expect(fn(1, undefined)).to.throw();
    });

    it('should throw error when direction is incorrect', function() {
      const fn = (dir) => {
        return function() {
          new Ship(1, 1, dir, shipType.BATTLESHIP);
        }
      }

      expect(fn('up')).to.throw();
      expect(fn('left')).to.throw();
    });
    
    it('should not throw error when direction is correct', function() {
      const fn = (dir) => {
        return function() {
          new Ship(1, 1, dir, shipType.BATTLESHIP);
        }
      }

      expect(fn(dirType.DOWN)).to.not.throw();
      expect(fn(dirType.RIGHT)).to.not.throw();
    });

    it('should throw error when ship is incorrect', function() {
      const fn = (dir) => {
        return function() {
          new Ship(1, 1, dir, shipType.BA);
        }
      }

      expect(fn('abcdef')).to.throw();
      expect(fn('hhhhh')).to.throw();
    });

    it('should not throw error when ship is correct', function() {
      const fn = (type) => {
        return function() {
          new Ship(1, 1, dirType.DOWN, type);
        }
      }

      expect(fn(shipType.BATTLESHIP)).to.not.throw();
      expect(fn(shipType.CRUISER)).to.not.throw();
      expect(fn(shipType.DESTROYER)).to.not.throw();
      expect(fn(shipType.SUBMARINE)).to.not.throw();
    });

  });

  describe('cellList', function() {
    it('should return correct list of ship position', function() {
      let ship = new Ship(1, 1, dirType.DOWN, shipType.BATTLESHIP);
      expect([[1,1], [1,2], [1,3], [1,4]]).to.deep.equal(ship.shipPositionList());
    });

    it('should return correct list of ship position', function() {
      let ship = new Ship(3, 1, dirType.RIGHT, shipType.CRUISER);
      expect([[3,1], [4,1], [5,1]]).to.deep.equal(ship.shipPositionList());
    });

    it('should return correct list of ship position', function() {
      let ship = new Ship(5, 2, dirType.RIGHT, shipType.SUBMARINE);
      expect([[5,2]]).to.deep.equal(ship.shipPositionList());
    });
  })
});
