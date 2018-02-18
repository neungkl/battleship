const chai = require('chai');
const Vector2 = require('./vector2');

const expect = chai.expect;

describe('Vector2', () => {
  describe('constructor', function() {
    it('should throw error when not given X and Y', function() {
      const fn = (x, y) => {
        return function() {
          new Vector2(x, y);
        }
      }

      expect(fn(null, null)).to.throw();
      expect(fn(undefined, null)).to.throw();
      expect(fn(undefined, 1)).to.throw();
      expect(fn(1, undefined)).to.throw();
    });
  });

  describe('isNearPosition', function() {
    it('should throw error when argument is not Vector2', function() {
      let vecA = new Vector2(1, 2);
      const fn = (other) => {
        return function() {
          vecA.isNearPosition(other);
        }
      }

      expect(fn(5)).to.throw();
      expect(fn([1,2])).to.throw();
      expect(fn(null)).to.throw();
    });

    it('should return true when same position', function() {
      for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
          let vecA = new Vector2(i, j);
          let vecB = new Vector2(i, j);
          expect(vecA.isNearPosition(vecB)).to.be.true;
        }
      }
    });

    it('should return true when near position', function() {
      for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
          let vecA = new Vector2(i, j);
          let vecB = new Vector2(i + (j % 2 ? 1 : -1), j + (i % 2 ? 1 : - 1));
          expect(vecA.isNearPosition(vecB)).to.be.true;
        }
      }
    });

    it('should return false when far position', function() {
      for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
          let vecA = new Vector2(i, j);
          let vecB = new Vector2(i + (1 + j) * (j % 2 ? 1 : -1), j + (1 + i) * (i % 2 ? 1 : -1));
          expect(vecA.isNearPosition(vecB)).to.be.false;
        }
      }
    });

    it('should return false when far position (but some axis is same)', function() {
      for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
          let vecA = new Vector2(i, j);
          let vecB;
          if (i % 2) {
            vecB = new Vector2(i, j + (1 + i) * (i % 2 ? 1 : -1));
          } else {
            vecB = new Vector2(i + (1 + j) * (j % 2 ? 1 : -1), j);
          }
          expect(vecA.isNearPosition(vecB)).to.be.false;
        }
      }
    });
  })
});
