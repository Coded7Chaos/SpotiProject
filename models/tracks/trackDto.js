const mongoose = require('mongoose');

const tracksSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 255
        },
        artist: {
            type: String,
            trim: true,
            minlength: 1,
            maxlength: 100,
            required: true
        },
        genre: {
            type: String,
            enum: ['pop', 'rock', 'hip-hop', 'electronic', 'classical', 'other'] // Predefined genres
        },
        album: {
            type: String,
            maxlength: 100,
            trim: true
        },
        releaseYear: {
            type: Number,
            min: 1900, // Minimum reasonable release year
            max: new Date().getFullYear() // Maximum is current year
        },
        duration: {
            type: Number,
            min: 0 // Duration can't be negative
        },
        lyrics: {
            type: String,
        }
    });


module.exports = mongoose.model('Track', tracksSchema);
