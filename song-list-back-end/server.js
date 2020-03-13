const express = require('express')
const app = express()
const PORT = 3003
// const cors = require('cors')
const songController = require('./controllers/songs.js')
const mongoose = require('mongoose')
app.use(express.json())

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Blocked by CORS'))
        }
    }
}
app.use(cors(corsOptions))

mongoose.connection.on('error', error => { console.log(error.message + 'Forgot Mongo!')})
mongoose.connection.on('Disconnected', ()=> console.log('Disconnected'))
mongoose.connect('mongodb://localhost:27017/songs', {useUnifiedTopology: true, useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log('Connected to mongoose')
})

app.use('/songs', songController)

app.listen(PORT, ()=> {
    console.log('Listening...')
})
