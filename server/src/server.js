// import express from 'express' --> we are gonna try alternative way with the built-in node module for servers
// const app = express()
// app.listen()

import http from 'http'

import app from './app.js'
import { loadPlanetsData } from './models/planets.model.js'

await loadPlanetsData()

const PORT = process.env.PORT || 8000

const server = http.createServer( app ) //It's an alternative way to do it, but the result is the same. Express is just a fancy listener function for the builtin http server

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})




console.log(PORT);