let express = require('express');
let path = require('path');
const { urlencoded } = require('express');
let router_productos = require('./src/routes/router_productos.js');
let router_carrito = require('./src/routes/router_carrito.js');
require('dotenv').config()

const PORT = process.env.PORT || 8080;

let app = express();
global.admin = true;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}\nhttp://localhost:${PORT}`);
});

// Motor de plantillas
app.set('views', path.join(__dirname, 'src', 'views', 'ejs'));
app.set('view engine', 'ejs');

app.use('/api/productos', router_productos);
app.use('/api/carrito' , router_carrito);
app.use((req, res, next) => {
    res.json({error : -2, descripcion: `ruta ${req.path} no valida`});
})

app.post('/api/login', (req, res, next) => {
    let user = req.query.user;
    if(user == 'admin'){
        global.admin = true;
    } 
    res.json({admin : global.admin});

});

