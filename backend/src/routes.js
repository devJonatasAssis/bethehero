const express = require('express');
const routes = express.Router();

const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const SessionController = require('./controllers/SessionController');

// Rota do Login
routes.post('/sessions/login', SessionController.store);

// Rota da ONG
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

//Rota de Casos
routes.get('/casos', CasoController.index);
routes.get('/cases_details', CasoController.show);
routes.post('/casos', CasoController.store);
routes.delete('/casos/:id', CasoController.delete);

module.exports = routes;