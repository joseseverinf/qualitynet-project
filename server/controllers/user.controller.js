const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports.register = (req, res) => {
    User.find({ $or: [{ email: req.body.email }, { name: req.body.name }] })
        .then(data => {
            if (!data || data.length == 0) {
                User.create(req.body)
                    .then(user => res.status(200).json({ ok: true, message: 'Usuario registrado correctamente', data: user }))
                    .catch(error => {
                        if (error.name === 'ValidationError') {
                            res.status(200).json({ ok: false, message: error.message, error: error })
                        } else {
                            res.status(200).json({ ok: false, message: 'Error al registrar el usuario' })
                        }
                    });
            } else {
                res.status(200).json({ ok: false, message: 'El usuario ya existe' })
            }
        }).catch(error => {
            if (error.name === 'ValidationError') {
                res.status(200).json({ ok: false, message: error.message, error: error })
            } else {
                res.status(200).json({ ok: false, message: 'Error al registrar el usuario' })
            }
        })
}

module.exports.login = (req, res) => {
    User.find({ $or: [{ email: req.body.username }, { name: req.body.username }] })
        .then(resp => {
            if (resp && resp.length == 1) {
                bcrypt.compare(req.body.password, resp[0].password)
                    .then(valid => {
                        if (valid) {
                            const payload = {
                                id: resp[0]._id,
                                name: resp[0].name,
                                email: resp[0].email
                            }
                            const token = jwt.sign(payload, secret);
                            res.cookie("usertoken", token, secret, { httpOnly: true })
                                .json({ ok: true, message: 'Usuario autenticado correctamente', data: payload });
                        } else {
                            res.json({ ok: false, message: 'Ha ocurrido un problema al autenticar al usuario' });
                        }
                    })
            } else {
                res.json({ ok: false, message: 'Usuario no encontrado o Clave incorrecta' });
            }
        }).catch(error => res.json({ ok: false, message: 'Credenciales incorrectas' }));
}

module.exports.list = (req, resp) => {
    User.find()
        .then(data => resp.status(200).json({ ok: true, message: 'Usuarios', data: data}))
        .catch(error => {
            console.log('LIST', error);
            resp.status(500).json({ok: false, message: 'Error al obtener los usuarios'})
        });
}