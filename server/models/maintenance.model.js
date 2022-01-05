const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: [true, 'El Cliente es requerido']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stove",
        required: [true, 'El producto es requerido']
    },
    maintenanceStatus: {
        type: String,
        required: [true, 'El campo estado de la mantención es requerido (las opciones viables son "Agendado", "Realizada", "Confirmada", "Cancelada")'],
    },
    technical: {
        type: String,
        required: [true, 'El técnico asignado a la mantención es requerido']
    },
    scheduledDate: {
        type: Date,
        required: [true, 'El campo Fecha Mantención Agendada es requerido'],
    },
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


MaintenanceSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

MaintenanceSchema.set('toObject', { virtuals: true });
MaintenanceSchema.set('toJSON', { virtuals: true });

const Maintenance = mongoose.model("Maintenance", MaintenanceSchema, "maintenances");

module.exports = Maintenance;