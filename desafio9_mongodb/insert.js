// Punto 1

let productos = [
    {
        "nombre": "Remera",
        "descripcion" : "Talle XS",
        "sku": 291923,
        "precio" : 1900,
        "stock": 100
    },
    {
        "nombre": "Pulover",
        "descripcion" : "Talle XS",
        "sku": 291923,
        "precio" : 1900,
        "stock": 100
    },
    {
        "nombre": "Remera",
        "descripcion" : "Talle XS",
        "sku": 291923,
        "precio" : 1900,
        "stock": 100
    },
    {
        "nombre": "Zapatillas Naik",
        "descripcion" : "Talle 42",
        "sku": 291923,
        "precio" : 1900,
        "stock": 100
    },
    {
        "nombre": "Televisor de tubo",
        "descripcion" : "Usado",
        "sku": 291923,
        "precio" : 2,
        "stock": 1
    },
    {
        "nombre": "Barbijos",
        "descripcion" : "-",
        "sku": 291923,
        "precio" : 1900,
        "stock": 100000
    },
    {
        "nombre": "Jean azul",
        "descripcion" : "Talle L",
        "sku": 291923,
        "precio" : 1900,
        "stock": 100
    },
    {
        "nombre": "Gorra",
        "descripcion" : "Negra",
        "sku": 2919223,
        "precio" : 900,
        "stock": 1000
    },
    {
        "nombre": "Monitor Curvo",
        "descripcion" : "Full HD IPS 24 pulgadas",
        "sku": 2912323923,
        "precio" : 8900,
        "stock": 12
    }
];

let mensajes = [
    {
        "email": "email1@gmail.com",
        "mensaje": "Hola, como estas?"
    },
    {
        "email": "email2@gmail.com",
        "mensaje": "Todo bien, vos?"
    },
    {
        "email": "email1@gmail.com",
        "mensaje": "Con calor"
    },
    {
        "email": "email3@gmail.com",
        "mensaje": "Que tal genteeee"
    },
    {
        "email": "email4@gmail.com",
        "mensaje": "Alto chat"
    },
    {
        "email": "¿mauro@gmail.com",
        "mensaje": "Hola, soy Mauro"
    },
    {
        "email": "email2@gmail.com",
        "mensaje": "Todo bien, vos?"
    },
    {
        "email": "email1@gmail.com",
        "mensaje": "Con calor"
    },
    {
        "email": "email2@gmail.com",
        "mensaje": "Todo bien, vos?"
    },
    {
        "email": "email2@gmail.com",
        "mensaje": "Todo bien, vos?"
    }

];

db = connect("localhost:27017/ecommerce");

productos_insert = db.productos.insert(productos);
mensajes_insert = db.mensajes.insert(mensajes);

print(productos_insert);
print(mensajes_insert);