import 'dotenv/config' 
import express, { Request, Response, NextFunction } from 'express'
import http from 'http'
import cors from 'cors'

import { Server } from 'socket.io'

import { router } from './routes'

const app = express()
app.use(cors())

const serverHttp = http.createServer(app)
app.use(express.json())

const io = new Server(serverHttp, {
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
   // Add this
   if (req.method === 'OPTIONS') {
  
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Max-Age', '120');
        return res.status(200).json({});
    }
  
    next();
  
  });

app.use(router)

app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)

})

app.get('/signin/callback', (req, res) => {
    const { code } = req.query

    return res.json(code)
})


export {serverHttp, io}