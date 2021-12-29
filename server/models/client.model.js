const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
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
    agreement: {
        type: Boolean,
        required: [true, 'Se debe indicar si el cliente cuenta con un convenio vigente (agreement=true)'],
    },
    discount: {
        type: Number,
        required: [true, 'Se debe indicar si el registro se creara como activado (true) o desactivado (false)'],
    },
    status: {
        type: Boolean,
        required: [true, 'Se debe indicar si el registro se creara como activado (true) o desactivado (false)'],
    }
}, 
{ timestamps: { createdAt: true, updatedAt: true } });

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;