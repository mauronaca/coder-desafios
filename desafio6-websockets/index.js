let express = require('express');
let path = require('path');
let { Server : HttpServer } = require('http');
let Socket = require('./utils/sockets');
const { profile } = require('console');

let { Router } = express;
let { urlencoded } = require('express');
let Productos = require('./src/Productos.js');

const PORT = 8080;

let app = express();
let router_product = new Router();
let httpServer = new HttpServer(app);
let socket = new Socket(httpServer);

socket.init();

httpServer.listen(PORT, () => console.log('http://localhost:8080/'));

// Ruta raiz de productos
app.use('/api/productos', router_product);
app.use('/', (req, res) => res.redirect('/api/productos'));

router_product.use(urlencoded({extended:true}));
router_product.use(express.json());

// Motor de plantillas
app.set('views', path.join(__dirname, 'src', 'views', 'ejs'));
app.set('view engine', 'ejs');


router_product.get('/', (req, res, next) => {
    res.render('./pages/index');
});
