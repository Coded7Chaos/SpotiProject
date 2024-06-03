var express = require('express');
var router = express.Router();
const Product = require('../models/product/productsDto');
const mongoose = require('mongoose');


/* GET products listing. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling GET requests to products ',
        nombreDelProducto: 'hot dog',
        id : '3452'
    });
});


/* POST products listing. */
router.post('/', async (req, res, next)=> {
    try{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    const createdProduct = await product.save();

    res.status(201).json({
        message: 'Producto creado exitosamente',
        createdProduct: createdProduct
    });
} catch (err) {
    res.status(500).json({
        error: err
    });
}
});
/* GET a product by its ID passed as a path parameter */

router.get('/:productId', async (req, res, next) => {
    try {
        // Obtener el ID del producto de la solicitud
        const productId = req.params.productId;

        // Buscar el producto en la base de datos
        const product = await Product.findById(productId).populate('RelatedData');
        // Verificar si se encontró el producto
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Enviar el producto y sus datos relacionados en formato JSON
        res.json({ product });
    } catch (error) {
        next(error);
    }
});


module.exports = router;