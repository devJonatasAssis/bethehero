const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('caso').count();

        const caso = await connection('caso')
            .join('ong', 'ong.id', '=', 'caso.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'caso.*',
                'ong.nome_ong',
                'ong.email_ong',
                'ong.whatsapp_ong',
                'ong.cidade_ong',
                'ong.uf_ong',
            ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(caso);
    },

    async show(req, res) {
        const { ong_id } = req.headers;
        const casosDetalhados = await connection('caso').where('ong_id', ong_id).select('*');
        return res.json(casosDetalhados);
    },

    async store(req, res) {
        const { ong_id } = req.headers;
        const { titulo_caso, desc_caso, valor_caso } = req.body;

        const [id] = await connection('caso').insert({
            titulo_caso,
            desc_caso,
            valor_caso,
            ong_id
        });

        return res.json({ id });
    },

    async update(req, res) { },

    async delete(req, res) {
        const { id } = req.params;
        const { ong_id } = req.headers;

        const caso = await connection('caso').where('id', id).select('ong_id').first();

        if (caso.ong_id !== ong_id) {
            return res.status(401).json({ error: "Operação não autorizada" });
        }

        await connection('caso').where('id', id).delete();

        return res.status(204).send();
    }
}