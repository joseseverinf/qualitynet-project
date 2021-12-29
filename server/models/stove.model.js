const mongoose = require('mongoose');

const StoveSchema = new mongoose.Schema({
    sotveName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    stoveBrand: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    stoveCode: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 9
    },
    stoveOrigin: {
        type: String,
    },
    stoveImage: {
        type: String,
    },
   
}, { timestamps: true });

const Stove = mongoose.model("Stove", StoveSchema);

module.exports = Stove;