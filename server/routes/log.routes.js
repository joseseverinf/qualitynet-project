const LogController = require('../controllers/log.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/logs', authenticate, LogController.list);
    app.get('/api/logs/:id', authenticate, LogController.get);
    app.post('/api/logs', authenticate, LogController.create);
    app.put('/api/logs/:id', authenticate, LogController.update);
    app.delete('/api/logs/:id', authenticate, LogController.del);
}