const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const { id } = req.body;

        const ong = await connection('ong').where('id', id).select('nome_ong').first();

        if (!ong) {
            return res.status(400).json({ error: 'Não encontramos nenhuma ONG com o ID informado' });
        }

        return res.json(ong);
    }
}