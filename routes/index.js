const express = require('express');
const app = express()

app.use(require('./orderPizza'));


module.exports = app;