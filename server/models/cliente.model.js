const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    rut: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 12
    },
    estufa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estufa',
        required: true,
    },
    mantencion: {
        type: String,
        required: true,
        format: 'date',
    },
}, { timestamps: true });

const Cliente = mongoose.model("Cliente", ClienteSchema);

module.exports = Cliente;