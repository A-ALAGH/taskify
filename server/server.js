require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const todorouter = require('./routes/todo')
const cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log(err))
const db = mongoose.connection

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/', todorouter)

app.listen(port, () => {
    console.log(`Application started succesfully on port ${port}`)
})