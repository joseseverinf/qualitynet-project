const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({

    status: {
        type: Boolean,
        required: [true, 'Se debe indicar si el registro se creara como activado (true) o desactivado (false)'],
    }
}, 
{ timestamps: { createdAt: true, updatedAt: true } });

const Sale = mongoose.model("Sale", SaleSchema, "sales");

module.exports = Sale;