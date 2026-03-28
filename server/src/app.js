const express = require('express');
const planetRouter = require('./routes/planets/planets.router');

const app = express();
app.use(express.json());
app.use('/planets',planetRouter);

module.exports =app;