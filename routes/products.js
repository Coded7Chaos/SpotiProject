var express = require('express');
var router = express.Router();
const productSchema = require('../models/product/productsDto');
const mongoose = require('mongoose');



/* POST create product  */
router.post('/', (req, res)=> {
    const { name, price } =req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Missing required fields: name and price' });
    }
    const product = new productSchema({ name, price });
    product
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});


/* GET product by ID*/
router.get("/:productId", (req,res)=>{
    const { productId } = req.params;
    productSchema
        .findById(productId)
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});

/*GET list of all products */

router.get('/', (req, res)=> {
    productSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});


/* PUT update product by ID*/
router.put("/:productId", (req,res)=>{
    const { productId } = req.params;
    const { name, price } = req.body;
    productSchema
        .updateOne( { _id: productId }, { $set: {name, price } } )
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});


/* DELETE delete a product by ID*/
router.delete("/:productId", (req,res)=>{
    const { productId } = req.params;
    productSchema
        .findByIdAndDelete( productId )
        .then((data) => res.json(data))
        .catch((error) => res.json({
            message: error
        }));
});



module.exports = router;