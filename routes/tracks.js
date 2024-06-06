var express = require('express');
var router = express.Router();
const productSchema = require('../models/tracks/trackDto');
const mongoose = require('mongoose');



/* POST create new track info.
*       http://localhost:3000/tracks
*   */
router.post('/', (req, res)=> {
    const { title, artist, genre, album, releaseYear, duration, lyrics } =req.body;
    const track = new tracksSchema({ title, artist, genre, album, releaseYear, duration, lyrics });
    track
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});


/* GET find track info by ID
*   http://localhost:3000/tracks/{trackId}
* */
router.get("/:trackId", (req,res)=>{
    const { trackId } = req.params;
    tracksSchema
        .findById(trackId)
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});

/*GET a list of all tracks
*   http://localhost:3000/tracks
*  */

router.get('/', (req, res)=> {
    tracksSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});


/* PUT update track by ID
*   http://localhost:3000/tracks/{trackId}
* */
router.put("/:trackId", (req,res)=>{
    const { trackId } = req.params;
    const { title, artist, genre, album, releaseYear, duration, lyrics } = req.body;
    tracksSchema
        .updateOne( { _id: trackId }, { $set: { title, artist, genre, album, releaseYear, duration, lyrics } } )
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});


/* DELETE delete a track by ID
*   http://localhost:3000/tracks/{trackId}
* */
router.delete("/:trackId", (req,res)=>{
    const { trackId } = req.params;
    tracksSchema
        .findByIdAndDelete( trackId )
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});



module.exports = router;