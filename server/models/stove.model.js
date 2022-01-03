const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const StoveSchema = new mongoose.Schema({
    stoveName: {
        type: String,
        required: [true, 'El campo Nombre Estufa es requerido'],
        minlength: 3,
        maxlength: 50
    },
    stoveBrand: {
        type: String,
        required: [true, 'El campo Marca Estufa es requerido'],
        minlength: 3
    },
    stoveModel: {
        type: String,
        required: [true, 'El campo Modelo Estufa es requerido'],
        minlength: 3,
        //unique: [true, 'El campo Modelo Estufa no puede estar repetido'],
    },
    stoveCode: {
        type: String,
        required:[true, 'El campo Código Estufa es requerido'],
        minlength: 4
    },
    stoveColor: {
        type: String,
    },
    stoveOrigin: {
        type: String,
    },
    stoveAmount: {
        type: Number,
    },
    stoveUnitPrice: {
        type: Number,
    },
    stoveImage: {
        type: String,
    },
    stoveCharacteristic: {
        type: String,
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

//StoveSchema.plugin(uniqueValidator, { message: 'El Producto no puede estar repetido.' });

StoveSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

StoveSchema.set('toObject', { virtuals: true });
StoveSchema.set('toJSON', { virtuals: true });

const Stove = mongoose.model("Stove", StoveSchema);

module.exports = Stove;