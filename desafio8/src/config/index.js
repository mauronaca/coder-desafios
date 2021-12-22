require('dotenv').config();

const config = {
    dev : process.env.NOD_ENV !== 'production', // Indica si estamos en desarrollo
    cors : `${process.env.CORS}`,
    port : process.env.PORT
}

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

module.exports = {config, db};