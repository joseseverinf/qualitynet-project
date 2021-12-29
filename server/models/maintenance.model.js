const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({

    status: {
        type: Boolean,
        required: [true, 'Se debe indicar si el registro se creara como activado (true) o desactivado (false)'],
    }
}, 
{ timestamps: { createdAt: true, updatedAt: true } });

const Maintenance = mongoose.model("Maintenance", MaintenanceSchema, "maintenances");

module.exports = Maintenance;