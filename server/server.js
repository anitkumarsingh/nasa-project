const express = require('express');

const PORT = 6000 || process.env.PORT;

const app = express();

app.get('/hello',(req,res)=>{
    res.status(200).json({msg:'Hello from server'})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})