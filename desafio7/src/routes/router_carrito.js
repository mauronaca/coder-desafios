let express = require('express');
let path = require('path');
let { Router } = express;
const { urlencoded } = require('express');
const Contenedor = require('../utils/Contenedor');

let router = new Router;

let carritos = new Contenedor(path.join('src', 'models', 'carrito.json'));

router.use(express.json());
router.use(urlencoded({extended : true}));


router.get('/', (req, res, next) => {
    res.send('Carrito');
});

module.exports = router;
