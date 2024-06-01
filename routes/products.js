var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    res.status(200).json({
        message: 'Handling GET requests to products '
    });
});


/* POST products listing. */
router.post('/', function(req, res, next) {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    });
});

/* GET a product by its ID passed as a path parameter */

router.get('/:productId', function (req, res, next) {
    const id = req.params.productId;
    if (id==='12345'){
        res.send('correct id')
    } else{
        res.status(200).json({
           message: 'wrong id',
           productId:  12345
        });
    }

});


module.exports = router;