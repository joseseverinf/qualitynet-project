const SaleController = require('../controllers/sale.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/ventas', authenticate, SaleController.list);
    app.get('/api/ventas/:id', authenticate, SaleController.get);
    app.post('/api/ventas', authenticate, SaleController.create);
    app.put('/api/ventas/:id', authenticate, SaleController.update);
    app.delete('/api/ventas/:id', authenticate, SaleController.del);
}