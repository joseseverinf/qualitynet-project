const Cliente = require('../models/cliente.model');


module.exports.create = (req, resp) => {
    const cliente = req.body;
    Cliente.create(cliente)
        .then(data => resp.status(200).json({ ok: true, message: 'Se agregó el cliente', data: data}))
        .catch(error => {
            console.log('CREATE', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al guardar el cliente'})
            }
        });
}

module.exports.update = (req, resp) => {
    const cliente = req.body;
    Cliente.findOneAndUpdate({_id: req.params.id }, cliente)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó el cliente', data: cliente}))
        .catch(error => {
            console.log('EDIT', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al guardar el cliente'})
            }
        });
}

module.exports.get = (req, resp) => {
    Cliente.findById(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Cliente', data: data}))
        .catch(error => {
            console.log('GET', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el cliente'})
        });
}
module.exports.list = (req, resp) => {
    Cliente.find().populate('estufa', 'nombreEstufa marcaEstufa')
        .then(data => resp.status(200).json({ ok: true, message: 'Cliente', data: data}))
        .catch(error => {
            console.log('LIST', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el cliente'})
        });
}

module.exports.del = (req, resp) => {
    Cliente.findByIdAndRemove(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Se eliminó el cliente', data: data}))
        .catch(error => {
            console.log('DELETE', error);
            resp.status(500).json({ok: false, message: 'Error al eliminar el cliente'})
        });
}