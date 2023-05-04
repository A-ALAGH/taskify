const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duedate: {
        type: Date,
        // in milliseconds new Date(+new Date()+7*24*60*60*1000)
        default: () => new Date(+new Date()+7*24*60*60*1000)
    }
}, {
    timestamps: true
})

const ToDo = mongoose.model('ToDo', todoSchema)

module.exports = ToDo