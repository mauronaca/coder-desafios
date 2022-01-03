
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
    }
];

db = connect("localhost:27017/ecommerce");

insert = db.productos.insert(productos);

print(insert);