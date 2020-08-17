const express= require('express')
const bodyParser = require('body-parser')
const http = require('http');
const path=require('path')
const db =require('./modals/db')


var app = express()
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'../dist/ChattingApp')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../dist/ChattingApp/index.html'))
})



const server=http.createServer(app)
require('./socket.js')(server)

server.listen(process.env.PORT,()=>{
    console.log("application connected")
})