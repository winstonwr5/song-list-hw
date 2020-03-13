const songs = require('express').Router()
const Song = require('../models/songs.js')

// Index
songs.get('/', (req, res) => {
    Song.find({}, (error, foundSongs) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundSongs)
    })
})

// Create
songs.post('/', async (req, res) => {
    Song.create(req.body, (error, createdSong) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdSong)
    })
})

// Delete
songs.delete('/:id', (req, res) => {
    Song.findByIdAndRemove(req.params.id, (error, deletedSong) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedSong)
    })
})

// Seed
songs.get('/seed', (req, res)=>{
    song.create([
        {
            Song:'Clap Hands',
            Album:'Rain Dogs',
            Artist:'Tom Waits',
            Released: 1985,
            Likes: 20000
        },
        {
            Song:'Killing in the Name',
            Album:'Rage Against the Machine',
            Artist:'Rage Against the Machine',
            Released: 1992,
            Likes: 50000
        },
        {
            Song:'Chucky vs. The Giant Tortoise',
            Album:'Mothership',
            Artist:'Dance Gavin Dance',
            Released: 2016,
            Likes: 10000
        },
        {
            Song:'Satellite',
            Album:'Periphery',
            Artist:'Periphery IV: HAIL STAN',
            Released: 2019,
            Likes: 8000
        },
        {
            Song:'lifeisgood',
            Album:'Bilmuri',
            Artist:'wet milk',
            Released: 2019,
            Likes: 8000
        },
    ], (err, data)=>{
        res.redirect('/');
    })
});

// update
songs.put('/:id', (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedSong) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedSong)
    })
})

module.exports = songs
