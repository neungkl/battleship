const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://db/battleship');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
