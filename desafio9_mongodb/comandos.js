db = connect("localhost:27017/ecommerce");
productos_cursor = db.productos.find();
mensajes_cursor = db.mensajes.find();
productos_length = db.productos.estimatedDocumentCount();
mensajes_length = db.mensajes.estimatedDocumentCount();

// Puntos 3 y 4

print(`-----------------------\nColeccion productos\n-----------------------\nCantidad de documentos: ${productos_length}`);

while ( productos_cursor.hasNext() ) {
    printjson( productos_cursor.next() );
}


print(`-----------------------\nColeccion mensajes\n-----------------------\nCantidad de documentos: ${mensajes_length}`);

while ( mensajes_cursor.hasNext() ) {
    printjson( mensajes_cursor.next() );
}

// Punto 5 agregar producto a la colección
insert_product = db.productos.insert({
    'nombre':  "Calculadora Casio",
    'descripcion' : "Cientifica modelo fx570",
    'sku' : 1234567,
    "precio" : 9800,
    "stock" : 92
})

print(insert_product);
print(`--------------------------------------\nProductos con precio menor a $1000`);

query = db.productos.find({"precio" : {$lt : 1000}});
printjson(query);

print(`--------------------------------------\nProductos con precio entre $1000 y $3000`);
query = db.productos.find(
    {
        $and : [
            {
                "precio" : {$gt : 1000}
            },
            {
                "precio" : {$lt : 3000}
            } 
        ]
    }
);
printjson(query);

print(`--------------------------------------\nProductos con precio mayor a $3000`);
query = db.productos.find({"precio" : {$gt : 3000}});
printjson(query);

print(`--------------------------------------\nTercer producto mas barato`);
query = db.productos.find({}).sort({"precio" : 1}).limit(3)[2].nombre;
printjson(query);


// Modificar stock a 100
db.productos.update(
    {},
    {
        $set : {
            "stock" : 100
        }
    }
);

// Modificar stock a 100
db.productos.update(
    {},
    {
        $set : {
            "stock" : 100
        }
    }
);