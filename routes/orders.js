var express = require('express');
var router = express.Router();

/* GET orders listing. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        message: 'Handling GET requests to orders '
    });
});


/* POST orders listing. */
router.post('/', function(req, res, next) {
    const order = {
        orderId: req.body.orderId,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Order created',
        IdOrder: req.body.orderId
    });
});

/* GET a order by its ID passed as a path parameter */

router.get('/:orderId', function (req, res, next) {
    const id = req.params.orderId;
    if (id==='sorpresa'){
        res.send('orden correcta')
    } else{
        res.status(200).json({
            message: 'orden incorrecta',
            orderId: orderId
        });
    }

});


module.exports = router;