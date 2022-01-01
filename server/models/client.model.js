const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'El campo Nombre es requerido'],
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: [true, 'El campo Apellido es requerido'],
        minlength: 3,
        maxlength: 50
    },
    rut: {
        type: String,
        required: [true, 'El campo RUT es requerido'],
        minlength: 8,
        maxlength: 12,
        unique: [true, 'El campo RUT no puede estar repetido'],
    },
    email: {
        type: String,
        required: [true, 'El campo Email es requerido'],
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: [true, 'El campo Teléfono es requerido'],
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
    active: {
        type: Boolean,
        required: [true, 'Se debe indicar si el registro se creara como activado (true) o desactivado (false)'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'El usuario es requerido']
    }
}, { timestamps: { createdAt: true, updatedAt: true } });


ClientSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico porfavor' });

ClientSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

ClientSchema.set('toObject', { virtuals: true });
ClientSchema.set('toJSON', { virtuals: true });

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;