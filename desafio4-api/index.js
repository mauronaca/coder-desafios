let express = require('express');
let { Router } = express;
let path = require('path');
const { urlencoded } = require('express');
let Productos = require('./src/Productos.js');

const PORT = 8080;
let productos = new Productos();

let app = express();
let router_productos = new Router;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.use('/api/productos', router_productos);
app.use('/formulario', express.static(path.join(__dirname, 'public', 'index.html')));
app.use('/', (req, res, next) => {
    res.redirect('/api/productos');
});

router_productos.use(express.json());
router_productos.use(urlencoded({extended : true}));

app.set('views', path.join(__dirname, 'views', 'ejs'));
app.set('view engine', 'ejs');

router_productos.get('/ingresar', (req, res) => {
    res.render('form');
});

router_productos.get('/', (req, res, next) => {
    res.json(productos.getAll());
});

router_productos.get('/:id', (req, res, next) => {
    let item = productos.getId(req.params.id);
    if(item){
        res.json(item);
    } else {
        res.json({error : "Invalid ID"});
    }
});

router_productos.post('/', (req, res, next) => {
    let producto = (Object.keys(req.query).length === 0) ? req.body : req.query;
    console.log(producto);

    if(!producto.hasOwnProperty('title')
    || !producto.hasOwnProperty('price')
    || !producto.hasOwnProperty('thumbnail')){
        res.status(404)
        res.json({error : "Faltan ingresar parametros"});
    } else {
        let id = productos.save({
            title : producto.title,
            price : producto.price,
            thumbnail: producto.thumbnail
        });
    
        if(id){
            res.status(200);
            res.redirect('/');
        } else {
            res.status(404);
            res.json({error : "An error has ocurred while saving a new product"});
        }
    }
    
}); 

router_productos.put('/:id', (req, res, next) => {
    let newProduct = req.query;
    let id = req.params.id;
    
    let response = {
        id : id,
        'new-product' : newProduct,
        'updated-product' : productos.getId(id)
    }

    let aux = productos.update(id, newProduct);
    if(!aux){
        res.json({error : "An error has ocurred while updating"});
    } else {
        res.json(response);
    }
});

router_productos.delete('/:id', (req, res, next) => {
    let id = req.params.id;

    let aux = productos.delete(id);
    if(!aux){
        res.json({error : "An error has ocurred while deleting"});
    } else {
        res.json({
            'updated-products' : aux
        })
    }
});