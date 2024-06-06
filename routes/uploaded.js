var express = require('express');
var router = express.Router();
//const uploadSchema = require('../models/tracks/trackDto');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


/* POST create new track info.
*       http://localhost:3000/uploaded
*   */
router.post('/',upload.single('file'), (req, res)=> {
   res.status(200).json(req.file);
});





module.exports = router;