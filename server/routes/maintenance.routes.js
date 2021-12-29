const MaintenanceController = require('../controllers/maintenance.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/mantenciones', authenticate, MaintenanceController.list);
    app.get('/api/mantenciones/:id', authenticate, MaintenanceController.get);
    app.post('/api/mantenciones', authenticate, MaintenanceController.create);
    app.put('/api/mantenciones/:id', authenticate, MaintenanceController.update);
    app.delete('/api/mantenciones/:id', authenticate, MaintenanceController.del);
}