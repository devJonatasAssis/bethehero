const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(req, res){
        const ongs = await connection('ong').select('*');
        return res.json(ongs);
    },
    async store(req, res) {
        const { nome_ong, email_ong, whatsapp_ong, cidade_ong, uf_ong } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ong').insert({
            id,
            nome_ong,
            email_ong,
            whatsapp_ong,
            cidade_ong,
            uf_ong
        });

        return res.json({ id });
    }
}