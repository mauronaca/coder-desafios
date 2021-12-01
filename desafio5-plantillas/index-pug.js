let express = require('express');
let path = require('path');

let { Router } = express;
let { urlencoded } = require('express');
let Productos = require('./src/Productos.js');

const PORT = 8080;

let app = express();
let router_product = new Router();

app.listen(PORT, () => console.log('http://localhost:8080/'));

// Ruta raiz de productos
app.use('/api/productos', router_product);
app.use('/', (req, res) => res.redirect('/api/productos'));

router_product.use(urlencoded({extended:true}));
router_product.use(express.json());

// Motor de plantillas
app.set('views', path.join(__dirname, 'src', 'views', 'pug'));
app.set('view engine', 'pug');

let productos = new Productos();

router_product.get('/', (req, res, next) => {
    res.render('./pages/index', {productos : productos.getAll()});
});

router_product.get('/formulario', (req, res, next) => {
    res.render('./pages/form');
});

router_product.post('/', (req, res, next) => {
    let producto = (Object.keys(req.query).length === 0) ? req.body : req.query;

    if (!productos.save(producto)) {
        res.json({error : "An error has ocurred while saving a new product"});
    } else {
        res.status(200);
        res.redirect('/');
    }
});