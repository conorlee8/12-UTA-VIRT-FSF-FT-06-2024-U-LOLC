// db/connection.js
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

client.connect()
    .then(() => console.log('Connected to the database - brought to you by Conor Lee'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;
