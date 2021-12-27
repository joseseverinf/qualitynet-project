const Estufa = require('../models/estufa.model');


module.exports.create = (req, resp) => {
    const estufa = req.body;
    Estufa.create(estufa)
        .then(data => resp.status(200).json({ ok: true, message: 'Se agregó la estufa', data: data}))
        .catch(error => {
            console.log('CREATE', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al guardar la estufa'})
            }
        });
}

module.exports.update = (req, resp) => {
    const estufa = req.body;
    Estufa.findOneAndUpdate({_id: req.params.id }, estufa)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó la estufa', data: estufa}))
        .catch(error => {
            console.log('EDIT', error);
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{
                resp.status(500).json({ok: false, message: 'Error al guardar la estufa'})
            }
        });
}

module.exports.get = (req, resp) => {
    Estufa.findById(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Estufa', data: data}))
        .catch(error => {
            console.log('GET', error);
            resp.status(500).json({ok: false, message: 'Error al obtener la estufa'})
        });
}
module.exports.list = (req, resp) => {
    Estufa.find()
        .then(data => resp.status(200).json({ ok: true, message: 'Estufa', data: data}))
        .catch(error => {
            console.log('LIST', error);
            resp.status(500).json({ok: false, message: 'Error al obtener la estufa'})
        });
}

module.exports.del = (req, resp) => {
    Estufa.findByIdAndRemove(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Se eliminó la Estufa', data: data}))
        .catch(error => {
            console.log('DELETE', error);
            resp.status(500).json({ok: false, message: 'Error al eliminar la estufa'})
        });
}