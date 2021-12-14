let express = require('express');
let path = require('path');
let { Router } = express;
const { urlencoded } = require('express');
require('dotenv').config()

let router = new Router;

router.use(express.json());
router.use(urlencoded({extended : true}));

router.get('/', (req, res, next) => {
    res.send('Carrito');
});

module.exports = router;
