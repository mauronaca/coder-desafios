let { db } = require('./index');
let knex = require('knex');


let mysql = knex({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: { min: 0, max: 7 }
});

/*let slite3 = knex({
    client: 'sqlite3',
    connection: {
        filename: './config/mydb.sqlite'
    }
});*/


// Singleton de clase Database, unica instancia

class Database {

    static client; //Atributo interno de la clase.

    constructor() {
        if (Database.client) {
            return Database.client;
        }
        Database.client = mysql;
        this.client = Database.client;
    }

    async create_table(name, columns) {
        let response = {};

        try {
            await this.client.schema.hasTable(name).then(async (exists) => {
                if (!exists) {
                    // crear la tabla de articulos,
                    response = await this.client.schema.createTable(name, table => {
                        table.increments('id').primary();

                        columns.forEach(column => {
                            table[column.data_type](column.name);
                        });
                    });

                } else {
                    throw ('Table already exists');
                }
            });
            return response;

        } catch (error) {
            throw (`Ha ocurrido el siguiente error: ${error}`);
        }
    }

    async insert(table_name, data) {
        try {

            let response = await this.client.from(table_name).insert(data);
            return response

        } catch (error) {

            throw (error);

        }
    }

    async update(table_name, id, data) {
        console.log(data);
        console.log(table_name);
        try {
            console.log(id);
            let response = await this.client
                .from(table_name)
                .where({ id: id })
                .update({ ...data });
            return await this.client.from(table_name).select();
        } catch (error) {
            console.log(`error : ${error}`);
            throw (error);
        }
    }
}

module.exports = new Database();