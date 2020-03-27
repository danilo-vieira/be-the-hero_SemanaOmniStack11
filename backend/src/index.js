// Todo o código da aplicação vai partir desse arquivo
const express = require('express');
const cors = require('cors'); // Irá determinar quem pode acessar a aplicação
const routes = require('./routes'); // Necessário "./" para indicar que é um arquivo e não um pacote

const app = express(); // Instancia a aplicação

app.use(cors()); // Irá determinar quem pode acessar a aplicação
app.use(express.json()); // É necessário informar ao express que o formato JSON será utilizado para o corpo das requisições
app.use(routes);

app.listen(3333); // Define a porta localhost