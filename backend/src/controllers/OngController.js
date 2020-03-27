const crypto = require('crypto'); // Usada para gerar o Id de ongs
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  async create(request, response) {
  const {name, email, whatsapp, city, uf} = request.body;

  /**
   * Gera 4 bytes de caracteres aleatórios;
   * Converte para uma string em hexadecimal;
   */
  const id = crypto.randomBytes(4).toString('HEX');

  await connection('ongs').insert({ // O insert pode demorar, então deve-se aguardar a execução com o await
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  });
  
  return response.json({ id });
  }
};