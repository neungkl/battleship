const express = require('express');
const gameController = require('../game/controller');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'ok', message: 'pong' });
});

router.post('/reset-game', (req, res) => {
  gameController.constructBoard().then((data) => {
    res.json(data);
  }, (err) => {
    console.error(err);
    res.status(500).json({ status: 'error', message: err });
  });
});

module.exports = router;