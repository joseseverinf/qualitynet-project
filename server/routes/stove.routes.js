const StoveController = require('../controllers/stove.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/estufas', authenticate, StoveController.list);
    app.get('/api/estufas/:id', authenticate, StoveController.get);
    app.post('/api/estufas', authenticate, StoveController.create);
    app.put('/api/estufas/:id', authenticate, StoveController.update);
    app.delete('/api/estufas/:id', authenticate, StoveController.del);
}