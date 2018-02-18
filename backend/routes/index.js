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
  gameController.constructBoard().then(() => {
    res.json({ ok: true });
  }, errorFn(res));
});

router.post('/attack', (req, res) => {

});

router.get('/board', (req, res) => {
  player.getBoardInfo().then((data) => {
    res.json({ ok: true, data });
  }, errorFn(res));
});

module.exports = router;
