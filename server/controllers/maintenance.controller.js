const Maintenance = require('../models/maintenance.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if (payload) {
        req.body.userId = payload.id;
        Maintenance.create(req.body)
            .then(data => {
                Maintenance.findById(data._id).populate('user', '-password')
                    .then(data => res.json({ ok: true, message: 'Registro agregado correctamente', data: data }))
                    .catch(error => {
                        console.log('CREATE', error);
                        if (error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ ok: false, message: 'Error al guardar el registro' });
                        }
                    });
            })
            .catch(error => {
                if (error.name == 'ValidationError')
                    res.status(200).json({ ok: false, message: error.message, error: error });
                else {
                    res.status(200).json({ ok: false, message: 'Error al guardar el registro' });
                }
            });
    } else {
        res.status(200).json({ ok: false, message: 'Error al guardar el reistro' });
    }
}

module.exports.update = (req, resp) => {
    const client = req.body;
    Maintenance.findOneAndUpdate({ _id: req.params.id }, client)
        .then(data => resp.status(200).json({ ok: true, message: 'Registro actualizado correctamente', data: client }))
        .catch(error => {
            if (error.name === 'ValidationError') {
                resp.status(500).json({ ok: false, message: error.message, error: error })
            } else {
                resp.status(500).json({ ok: false, message: 'Error al  actualizar el registro' })
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
    Maintenance.find({active: true}).populate('user', '-password').sort({updatedAt: 'desc'})
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