// 1 import dotenv
require('dotenv').config()

// 2 import express
const express = require('express');

// import mongodb connection.js
require('./DB/connection.js')

// 3 import cors
const cors = require('cors')
// 4 create server
const iplserver = express();



// 9A import Router
const router = require('./Routes/router')
const playerRouter = require('./Routes/playerRouter.js')
const teamRouter = require('./Routes/teamRouter.js')



iplserver.use('/uploads', express.static('uploads'));


// 5 cors need to be used in iplserver
iplserver.use(cors())

// 6 use middleware to convert json data to js object
iplserver.use(express.json())

iplserver.use('/', router)
iplserver.use('/player', playerRouter)
iplserver.use('/team', teamRouter)

// 7 define PORT 
const PORT = 5000;   

// 8 run the serer
iplserver.listen(PORT, () => {
   console.log(`Server is running in PORT ${PORT}`);

})

iplserver.get('/', (req, res) => {
   res.send("Project fair is running and waitiing for test2")
})