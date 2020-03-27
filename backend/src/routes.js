const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const SessionController = require('./controllers/SessionController');

// Rota do Login
routes.post('/sessions/login', SessionController.store);

// Rota da ONG
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome_ong: Joi.string().required(),
        email_ong: Joi.string().required().email(),
        whatsapp_ong: Joi.number().required().min(10).max(11),
        cidade_ong: Joi.string().required(),
        uf_ong: Joi.string().required().length(2)
    })
}), OngController.store);

//Rota de Casos
routes.get('/casos', CasoController.index);

routes.get('/cases_details', celebrate({
    [Segments.HEADERS]: Joi.object({
        ong_id: Joi.string().required()
    }).unknown()
}), CasoController.show);

routes.post('/casos', CasoController.store);

routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CasoController.delete);

module.exports = routes;