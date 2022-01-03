db = connect("localhost:27017/ecommerce");

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