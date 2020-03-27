const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); // Realiza a conexão de desenvolvimento

module.exports = connection;