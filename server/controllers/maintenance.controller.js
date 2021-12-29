const Maintenance = require('../models/maintenance.model');


module.exports.create = (req, resp) => {
    Maintenance.create(req.body)
        .then(data => resp.status(200).json({ ok: true, message: 'Registro agregado correctamente', data: data}))
        .catch(error => {
            console.log('CREATE', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al guardar el registro'})
            }
        });
}

module.exports.update = (req, resp) => {
    Maintenance.findOneAndUpdate({_id: req.params.id }, req.body)
        .then(data => resp.status(200).json({ ok: true, message: 'Registro actualizado correctamente', data: estufa}))
        .catch(error => {
            console.log('EDIT', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al  actualizar el registro'})
            }
        });
}

module.exports.get = (req, resp) => {
    Maintenance.findById(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Maintenance', data: data}))
        .catch(error => {
            console.log('GET', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el registro'})
        });
}
module.exports.list = (req, resp) => {
    Maintenance.find()
        .then(data => resp.status(200).json({ ok: true, message: 'Maintenance', data: data}))
        .catch(error => {
            console.log('LIST', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el registro'})
        });
}

module.exports.del = (req, resp) => {
    Maintenance.findByIdAndRemove(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Registro eliminado correctamente', data: data}))
        .catch(error => {
            console.log('DELETE', error);
            resp.status(500).json({ok: false, message: 'Error al eliminar el registro'})
        });
}