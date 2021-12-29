const Log = require('../models/log.model');


module.exports.create = (req, resp) => {
    Log.create(req.body)
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
    Log.findOneAndUpdate({_id: req.params.id }, req.body)
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
    Log.findById(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Log', data: data}))
        .catch(error => {
            console.log('GET', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el registro'})
        });
}
module.exports.list = (req, resp) => {
    Log.find()
        .then(data => resp.status(200).json({ ok: true, message: 'Log', data: data}))
        .catch(error => {
            console.log('LIST', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el registro'})
        });
}

module.exports.del = (req, resp) => {
    Log.findByIdAndRemove(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Registro eliminado correctamente', data: data}))
        .catch(error => {
            console.log('DELETE', error);
            resp.status(500).json({ok: false, message: 'Error al eliminar el registro'})
        });
}