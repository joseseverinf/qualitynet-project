const ClienteController = require('../controllers/client.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/clientes', authenticate, ClienteController.list);
    app.get('/api/clientes/:id', authenticate, ClienteController.get);
    app.post('/api/clientes', authenticate, ClienteController.create);
    app.put('/api/clientes/:id', authenticate, ClienteController.update);
    app.delete('/api/clientes/:id', authenticate, ClienteController.del);
}