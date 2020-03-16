const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    Song: [{type: String}],
    Album: [{type: String}],
    Artist: [{type: String}],
    Released: [{type: Number}],
    Likes: [{type: Number}],
    Playlist: {type: Boolean, default: false}
})

module.exports = mongoose.model('Song', songSchema )
