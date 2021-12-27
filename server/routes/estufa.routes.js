const EstufaController = require('../controllers/estufa.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/estufas', authenticate, EstufaController.list);
    app.get('/api/estufas/:id', authenticate, EstufaController.get);
    app.post('/api/estufas', authenticate, EstufaController.create);
    app.put('/api/estufas/:id', authenticate, EstufaController.update);
    app.delete('/api/estufas/:id', authenticate, EstufaController.del);
}