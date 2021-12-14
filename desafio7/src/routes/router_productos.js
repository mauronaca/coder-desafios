let express = require('express');
let { Router } = express;
let path = require('path');
const { urlencoded } = require('express');
let Contenedor = require('../utils/Contenedor.js');

let productos = new Contenedor(path.join('src', 'models', 'productos.json'));

let router_productos = new Router;

router_productos.use(express.json());
router_productos.use(urlencoded({extended : true}));

router_productos.use((req, res, next) => {
    if(req.method == "GET"){
        next();
    } else{
        if(global.admin){
            next();
        } else {
            res.json({error : -1, description: `ruta ${req.originalUrl} ${req.method} no autorizada`});
        }
    }
});

router_productos.get('/', async (req, res, next) => {
    let response = {};

    try{
        response = await productos.getAll();
    } catch(error) {
        response = {error : error};
    }
    res.json(response);
});

router_productos.get('/:id', async (req, res, next) => {
    let response = {};
    let itemID = req.params.id;


    try{
        let item = await productos.getById(itemID);
        response = item;
   
    } catch(error){
        response = {error : error};
    }

    res.json(response);

});

router_productos.post('/', async (req, res, next) => {
    let producto = (Object.keys(req.query).length === 0) ? req.body : req.query;

    let response = {};

    console.log(producto);

    if(!producto.hasOwnProperty('nombre')
    || !producto.hasOwnProperty('descripcion')
    || !producto.hasOwnProperty('codigo')
    || !producto.hasOwnProperty('foto')
    || !producto.hasOwnProperty('precio')
    || !producto.hasOwnProperty('stock')
    ){
        response = {error : "Faltan ingresar parametros"};

    } else {


        try{
            let save_resp = await productos.save(producto);
            response = await productos.getAll();
            //console.log(save_resp)
        } catch(error) {
            response = {error : "An error has ocurred while saving a new product"};
        }
        
    }
    
    res.json(response);
}); 

router_productos.put('/:id', async (req, res, next) => {
    let newProduct = (Object.keys(req.query).length === 0) ? req.body : req.query;
    let id = req.params.id;

    let response = {}
    
    try {
        await productos.update(id, newProduct);

        response = {
            id : id,
            'new-product' : newProduct,
            'updated-product' : await productos.getById(id)
        };

    } catch(error) {
        response = {error : error};
    }

    res.json(response);
});

router_productos.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    let response = {};
    
    try{
        let delete_resp = await productos.deleteById(id);
        response = await productos.getAll();
        
    } catch(error) { 
        response = {error : error};
    }

    res.json(response);
});

module.exports = router_productos;