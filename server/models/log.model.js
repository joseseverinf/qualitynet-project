const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    createBy: {
        type: String,
        required: [true, 'Debe ingresar el nombre del usuario creador'],
    },
    createAt: {
        type: Date,
        required: [true, 'Debe ingresar la fecha de creación'],
    },
    updateBy: {
        type: String,
        required: [true, 'Debe ingresar el nombre del usuario actualizador'],
    },
    updateAt: {
        type: Date,
        required: [true, 'Debe ingresar la fecha de actualización'],
    },
    active: {
        type: Boolean,
        required: [true, 'Se debe indicar si el registro se creara como activado (true) o desactivado (false)'],
    }
}, 
{ timestamps: { createdAt: true, updatedAt: true } });

const Log = mongoose.model('Log', LogSchema);
module.exports = Log;