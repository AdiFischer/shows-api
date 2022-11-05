import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { createNewShow, getAllShows, updateShow, deleteShow, getOneShow } from './src/shows.js'


const app = express()
app.use(cors())
app.use(express.json())

app.get('/shows', getAllShows)
app.post('/shows', createNewShow)
app.patch('/shows/:uid', updateShow)
app.delete('/shows/:uid', deleteShow)
app.get('/shows/:uid', getOneShow)






export const api = functions.https.onRequest(app)
