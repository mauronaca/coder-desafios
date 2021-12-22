let express = require('express');
let path = require('path')
let cors = require('cors');
let { Server : HttpServer } = require('http');
let Socket = require('console');

let { Router } = express;
let { urlencoder } = require('express');

let{ config } = require('./src/config');
let Database = require('./src/config/db');
let db = Database.client;

let app = express();

const PORT = config.port;

// middlewares
app.use(cors(config.cors));

// config
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.get('/', async (req, res, next) => {
    let response = {};
    try {
        response = await db.from('articulos').select();
    } catch (error) {
        console.log(error)
        response = {error : error};
    }
    
    res.json(response)
});


app.get('/create/:name', async (req, res, next) => {
    let response = {};
    let columns = (req.body.length !== 0) ?  
    [
        {
            name: 'title',
            data_type : 'string'
        },
        {
            name: 'price',
            data_type : 'float'
        },
        {
            name: 'thumbnail',
            data_type : 'string'
        }
    ] : req.body;
    let table_name = req.params.name;


    try {
        let db_resp = await Database.create_table(table_name, columns);
        response = {status : db_resp};
    } catch (error) {
        console.log(error);
        response = {error : error};
    } 

    res.json(response);
});

app.post('/insert/:name', async (req, res, next) => {
    // recibe los datos por body
    let response = {};
    let data = req.body;
    let table_name = req.params.name;

    console.log(data);
    console.log(table_name)

    try {
        let db_resp = await Database.insert(table_name, data);
        response = {status : db_resp};
    } catch (error) {
        console.log(error);
        response = {error : error};
    }

    res.json(response);
});

app.get('/update', async (req, res, next) => {
    let response = {};
    try {
        let db_resp = await Database.update('articulos-2', 2, {
            
            thumbnail:'aca tenes el linkardo'
        })
        response = {status : db_resp};
    } catch (error) {
        response = {error : error};
    }    

    res.json(response);
});