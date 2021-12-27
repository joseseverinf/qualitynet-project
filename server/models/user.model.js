const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Debe ingresar el nombre del usuario'],
        maxlength: [50, 'Su largo no debe ser mayor a 50']
    },
    email: {
        type: String,
        required: [true, 'Debe ingresar el email del usuario'],
        validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, 'El email no es válido']
    },
    password: {
        type: String,
        required: [true, 'Debe ingresar la clave del usuario'],
        minlength: [6, 'La clave debe tener mínimo 6 caracteres']
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las claves no son iguales')
    }
    next();
});

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;