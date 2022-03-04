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
        origin: "http://localhost:3000",
    }
})

io.on("connection", (socket) => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})

app.use(router)

app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)

})

app.get('/signin/callback', (req, res) => {
    const { code } = req.query

    return res.json(code)
})


export {serverHttp, io}