// import express, dotenv, cors

// loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/routing')
require('./config/db')

// create server using express
const bookstoreServer = express()

// enable cors in express server
bookstoreServer.use(cors())

// add json parse to server
bookstoreServer.use(express.json())

//use router in server 
bookstoreServer.use(router)

// create a port where server should listen in web
const PORT = 3000

// server listen in that port
bookstoreServer.listen(PORT,()=>{
    console.log("BookStore server started...And Waiting for client request");
})

// resolve http get request to http://localhost:3000/ using server
bookstoreServer.get('/',(req,res)=>{
        res.status(200).send(`<h1>BookStore server started...And Waiting for client request</h1>`)
})

// register
