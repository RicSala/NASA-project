import express from 'express'
import cors from 'cors'
import path from 'path'
import url from 'url'
import morgan from 'morgan'

import planetsRouter from './routes/planets/planets.router.js'
import launchesRouter from './routes/launches/launches.router.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const app = express()
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(morgan('combined'))
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))
app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html' ))
})



export default app


// TODO: Understand why is better separating server from app. What's the diff?
// TODO: REVIEW https://academy.zerotomastery.io/courses/1206554/lectures/31903128 9:45 index.html
// TODO: Why does it work on port 8000, but not on port 5000? --> Because the client has a PORT variable that should be env, and instead is deployed and = 8000. It's listening to port 8000!