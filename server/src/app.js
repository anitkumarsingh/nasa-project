const express = require('express');
const cors = require('cors');
const planetRouter = require('./routes/planets/planets.router');
const path = require('path');

const app = express();

app.use(cors({
    origin:'http://localhost:5173'
}));

app.use(express.json());
app.use(express.static(path.json(__dirname,'..','public')));

app.use('/planets',planetRouter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})

module.exports =app;