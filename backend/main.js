const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb://db/battleship');

app.use('/api/', require('./routes/index'));

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
