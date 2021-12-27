const mongoose = require('mongoose');

mongoose.pluralize(null);

mongoose.connect('mongodb://localhost/clientes')
.then( () => console.log('Conectado a la base de datos QualityNET'))
.catch( err => console.error('Error al conectar con la base de datos QualityNET', err));

