const Sale = require('../models/sale.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if (payload) {
        req.body.userId = payload.id;
        Sale.create(req.body)
            .then(data => {
                Sale.findById(data._id).populate('user', '-password')
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
        res.status(200).json({ ok: false, message: 'Error al guardar el registro' });
    }
}

module.exports.update = (req, resp) => {
    Sale.findOneAndUpdate({_id: req.params.id }, req.body, { new: true , runValidators: true})
        .then(data => resp.status(200).json({ ok: true, message: 'Registro actualizado correctamente', data: data}))
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
    Sale.findById(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Sale', data: data}))
        .catch(error => {
            console.log('GET', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el registro'})
        });
}
module.exports.list = (req, resp) => {
    Sale.find({active: true}).populate('user', '-password').sort({updatedAt: 'desc'})
        .then(data => resp.status(200).json({ ok: true, message: 'Sale', data: data}))
        .catch(error => {
            console.log('LIST', error);
            resp.status(500).json({ok: false, message: 'Error al obtener el registro'})
        });
}

module.exports.del = (req, resp) => {
    Sale.findByIdAndRemove(req.params.id)
        .then(data => resp.status(200).json({ ok: true, message: 'Registro eliminado correctamente', data: data}))
        .catch(error => {
            console.log('DELETE', error);
            resp.status(500).json({ok: false, message: 'Error al eliminar el registro'})
        });
}