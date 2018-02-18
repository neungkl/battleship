const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://db/battleship');

app.use('/api/', require('./routes/index'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
