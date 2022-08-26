const mongoose = require('mongoose')

const { Schema } = mongoose;

const todoTaskSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    value: {
        type: String
    },
    date: {
        type: Date,
        default: date.now
    }
})


module.exports = mongoose.model('Task', todoTaskSchema)