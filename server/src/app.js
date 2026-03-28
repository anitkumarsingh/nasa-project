const express = require('express');
const cors = require('cors');
const planetRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors({
    origin:'http://localhost:5173'
}));

app.use(express.json());
app.use('/planets',planetRouter);

module.exports =app;