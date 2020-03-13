const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    Song: [{type: String}],
    Album: [{type: String}],
    Artist: [{type: String}],
    Released: [{type: Number}],
    Likes: [{type: Number}]
})

module.exports = mongoose.model('Song', songSchema )
