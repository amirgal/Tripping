const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: String,
    author: String,
})

const Location = mongoose.model("Book", bookSchema)
module.exports = Location