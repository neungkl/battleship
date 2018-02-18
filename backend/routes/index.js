const express = require('express');
const gameController = require('../game/controller');
const player = require('../game/player');

const router = express.Router();

const errorFn = res => (err) => {
  console.log(err);
  res.status(500).json({ ok: false, message: err });
};

router.get('/ping', (req, res) => {
  res.json({ ok: true, message: 'pong' });
});

router.post('/reset-game', (req, res) => {
  gameController
    .constructBoard()
    .then(() => {
      res.json({ ok: true });
    })
    .catch(errorFn(res));
});

router.post('/attack', (req, res) => {
  const { x, y } = req.body;
  if (x == null || y == null) {
    res.status(400).json({ ok: false, message: 'X and Y must not be empty' });
  } else {
    player
      .attack(x, y)
      .then((data) => {
        res.json({ ok: true, data });
      })
      .catch(errorFn(res));
  }
});

router.get('/board', (req, res) => {
  player
    .getBoardInfo()
    .then((data) => {
      res.json({ ok: true, data });
    })
    .catch(errorFn(res));
});

router.get('/log', (req, res) => {
  player
    .getLog()
    .then((data) => {
      res.json({ ok: true, data });
    })
    .catch(errorFn(res));
});

module.exports = router;
