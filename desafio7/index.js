let express = require('express');
let path = require('path');
const { urlencoded } = require('express');
let router_productos = require('./src/routes/router_productos.js');
let router_carrito = require('./src/routes/router_carrito.js');
require('dotenv').config()

const PORT = process.env.PORT || 3000;

let app = express();
//let router_carrito = new Router;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}\nhttp://localhost:${PORT}`);
    //console.log(process.env.PORT)
});

// Motor de plantillas
app.set('views', path.join(__dirname, 'src', 'views', 'ejs'));
app.set('view engine', 'ejs');


app.use('/api/productos', router_productos);
app.use('/api/carrito', router_carrito);
app.use('/', (req, res, next) => {
    res.redirect('/api/productos');
});
