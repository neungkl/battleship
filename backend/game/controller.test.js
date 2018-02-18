const chai = require('chai');
const controlller = require('./controller');
const shipType = require('./ship.type');

const expect = chai.expect;

describe('Controlller', () => {
  describe('randomBoardPosition', function() {
    it('should random correctly', function() {
      const shipConfig = [
        [shipType.BATTLESHIP, 1],
        [shipType.CRUISER, 2],
        [shipType.DESTROYER, 3],
        [shipType.SUBMARINE, 4],
      ];
  
      for (let t = 0; t < 100; t++) {
        const shipCount = {};
        const ships = controlller.randomBoardPosition(shipConfig);
        
        // Assert that all ships are meet ship configuration
        for (let i = 0; i < ships.length; i++) {
          const type = ships[i].type;
          if (type in shipCount) {
            shipCount[type]++;
          } else {
            shipCount[type] = 1;
          }
        }
  
        for (let i = 0; i < shipConfig.length; i++) {
          const cfg = shipConfig[i];
          expect(cfg[1]).to.be.equal(shipCount[cfg[0]]);
        }

        // Assert that all ships are in the board area 
        for (let i = 0; i < ships.length; i++) {
          expect(ships[i].isInBoardArea(controlller.BOARD_SIZE)).to.be.true;
        }

        // Assert that all ships is not collide with each other
        for (let i = 0; i < ships.length; i++) {
          for (let j = i + 1; j < ships.length; j++) {
            expect(ships[i].collideWith(ships[j])).to.be.false;
          }
        }
      }
    });
  });
});
