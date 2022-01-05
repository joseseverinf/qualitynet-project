const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const SaleSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: [true, 'El Cliente es requerido']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stove",
        required: [true, 'El Cliente es requerido']
    },
    // productPrice: {
    //     //type: mongoose.Schema.Types.ObjectId,
    //     //ref: "Client",
    //     type: Number,
    //     required: [true, 'El precio del producto es requerido']
    // },
    // agreement: {
    //     //type: mongoose.Schema.Types.ObjectId,
    //     //ref: "Client",
    //     type: Boolean,
    //     required: [true, 'El Cliente es requerido']
    // },
    discount: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: "Client",
        type: Number,
        required: [true, 'El Cliente es requerido']
    },
    quantitie: {
        type: Number,
        required: [true, 'El campo cantidad es requerido'],
    },
    salePrice: {
        type: Number,
        required: [true, 'El campo precio es requerido'],
    },
    // saleDate: {
    //     type: Date,
    //     required: [true, 'El campo fecha venta es requerido'],
    // },
    // seller: {
    //     //type: mongoose.Schema.Types.ObjectId,
    //     //ref: "User",
    //     type: String,
    //     required: [true, 'El vendedor  es requerido']
    // },
    paymentMethod: {
        type: String,
        required: [true, 'El campo metodo de pago es requerido'],
    },
    // invoiceNumber: {
    //     type: Number,
    //     required: [true, 'El campo hora agendada es requerido'],
    // },
    observations: {
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


SaleSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico porfavor' });

SaleSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

SaleSchema.set('toObject', { virtuals: true });
SaleSchema.set('toJSON', { virtuals: true });

const Sale = mongoose.model("Sale", SaleSchema, "sales");

module.exports = Sale;