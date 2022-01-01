const Client = require('../models/client.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.create = (req, res) => {
    const payload = jwt.decode(req.cookies.usertoken, secret);
    if (payload) {
        const client = req.body;
        client.userId = payload.id;
        Client.create(client)
            .then(data => {
                Client.findById(data._id).populate('user', '-password')
                    .then(user => res.json({ ok: true, message: 'Se agregó el cliente', data: user }))
                    .catch(error => {
                        if (error.name == 'ValidationError')
                            res.status(200).json({ ok: false, message: error.message, error: error });
                        else {
                            res.status(200).json({ ok: false, message: 'Error al guardar el cliente' });
                        }
                    });
            })
            .catch(error => {
                if (error.name == 'ValidationError')
                    res.status(200).json({ ok: false, message: error.message, error: error });
                else {
                    res.status(200).json({ ok: false, message: 'Error al guardar el cliente' });
                }
            });
    } else {
        res.status(200).json({ ok: false, message: 'Error al guardar el cliente' });
    }
}

module.exports.update = (req, resp) => {
    const client = req.body;
    Client.findOneAndUpdate({ _id: req.params.id }, client)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó el cliente', data: client }))
        .catch(error => {
            if (error.name === 'ValidationError') {
                resp.status(500).json({ ok: false, message: error.message, error: error })
            } else {
                resp.status(500).json({ ok: false, message: 'Error al guardar el cliente' })
            }
        });
}

module.exports.get = (req, res) => {
    Client.findById(req.params.id).populate('user', '-password')
        .then(data => res.status(200).json({ ok: true, message: 'client', data: data }))
        .catch(error => {
            console.log('GET', error);
            res.status(500).json({ ok: false, message: 'Error al obtener el cliente' })
        });
}

module.exports.list = (req, res) => {
    Client.find({active: true}).populate('user', '-password').sort({updatedAt: 'desc'})
        .then(data => res.status(200).json({ ok: true, message: 'client', data: data }))
        .catch(error => {
            console.log('LIST', error);
            res.status(500).json({ ok: false, message: 'Error al obtener los clientes' })
        });
}

module.exports.del = (req, res) => {
    Client.findByIdAndRemove(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Se eliminó el cliente', data: data }))
        .catch(error => {
            console.log('DELETE', error);
            res.status(500).json({ ok: false, message: 'Error al eliminar el cliente' })
        });
}

