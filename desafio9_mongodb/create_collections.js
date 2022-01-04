db = connect("localhost:27017/ecommerce");

// Punto 1 y 2

db.createCollection("productos", 
    {
        autoIndexId: true,
        timeseries: {
            timeField: "timestamp",
            granularity: "minutes"
        }
    }
);

db.createCollection("mensajes", 
    {
        autoIndexId: true,
        timeseries: {
            timeField: "timestamp",
            granularity: "minutes"
        }
    }
);