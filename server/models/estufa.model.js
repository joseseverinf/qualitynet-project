const mongoose = require('mongoose');

const EstufaSchema = new mongoose.Schema({
    nombreEstufa: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    marcaEstufa: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    codigoEstufa: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 9
    },
    origenPais: {
        type: String,
    },
    imagenEstufa: {
        type: String,
    },
   
}, { timestamps: true });

const Estufa = mongoose.model("Estufa", EstufaSchema);

module.exports = Estufa;