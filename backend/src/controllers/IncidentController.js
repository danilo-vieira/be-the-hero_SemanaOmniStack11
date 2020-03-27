const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query; // Caso page não exista, 1 será o valor padrão

    const [count] = await connection('incidents').count(); // Pega a contagem de elementos
    // Entre "[]" pois count() retorna um array de elementos

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Irá relacionar dados da table "incidents" com a table "ongs"
      .limit(5)
      .offset((page - 1) * 5) // Determina de quantos em quantos elementos vão aparecer na pagina
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json( incidents )
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization; // Guarda informações do contexto da request (necessário para pegar o id da ong)
    
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params; // Pega o Id passado pela rota
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401) // 401 Código "Não autorizado"
        .json({ error: "Operation not permited." });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send(); // 204 Quando uma resposta não possui conteúdo
  }
};