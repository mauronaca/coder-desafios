let express = require('express');
let path = require('path');
let { Router } = express;
const { urlencoded } = require('express');
const Contenedor = require('../utils/Contenedor');

let router = new Router;

let carritos = new Contenedor(path.join('src', 'models', 'carritos.json'), 'carrito');
// Este objeto no es el mismo que el de router_productos pero apuntan al mismo json asi que
// no hay problema
let productos = new Contenedor(path.join('src', 'models', 'productos.json'));

router.use(express.json());
router.use(urlencoded({extended : true}));


router.get('/', async (req, res, next) => {
    let response = {};

    try{
        response = await carritos.getAll();
    } catch(error) {
        response = {error : error};
    }
    res.json(response);
});


router.post('/', async (req, res, next) => {

    let response = {};

    try{
        response = await carritos.save({});
    } catch(error) {
        response = {error : error};
    }
    
    res.json(response);
}); 

router.post('/:id/productos', async (req, res, next) => {

    let id_carrito = req.params.id;
    let id_prod =  (Object.keys(req.query).length === 0) ? req.body : req.query;
    let response = {};
    
    try {
        let producto = await productos.getById(id_prod.id_prod);
        console.log(producto)
        

        await carritos.update(id_carrito, {
            new_prod : producto
        });

        response = await carritos.getAll();
        

    } catch(error) {
        response = {error : error}
    }

    res.json(response);
}); 

router.get('/:id/productos', async (req, res, next) => {
    let id_carrito = req.params.id;
    let id_prod = req.query.id_prod;

    let response = {};
    
    console.log(id_carrito);

    try {
        let carrito = await carritos.getById(id_carrito);
        let producto = {};
        
        carrito.productos.forEach(element => {
            if(element.id == id_prod){
                producto = element;
            }
        });

        response = (Object.keys(producto).length == 0) ? {error : `El producto id=${id_prod} no se encuentra en el carrito`} : producto ;
         
    } catch(error) {
        response = {error : error};
    }

    res.json(response);
});

router.delete('/:id', async (req, res, next) => {

    let id_carrito = req.params.id;
    let response = {};
    
    try {
        let resp_id = await carritos.deleteById(id_carrito);
        response = await carritos.getAll();

    } catch(error) {
        response = {error : error};
    }   

    res.json(response);
});

router.delete('/:id/productos', async (req, res, next) => {

    let id_carrito = req.params.id;
    let id_prod =  (Object.keys(req.query).length === 0) ? req.body : req.query;

    let response = {};
console.log(id_prod)

    try {
        await carritos.deleteById(id_carrito, id_prod.id_prod);
        response = await carritos.getAll();

    } catch (error) {
        response = {error : error};
    }

    res.json(response);

});

module.exports = router;
