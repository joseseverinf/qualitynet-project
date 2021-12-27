const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

require('./config/mongoose.config');

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use( express.json() );
app.use( express.urlencoded( {extended: true }));

require('./routes/user.routes')(app);
require('./routes/cliente.routes')(app);
require('./routes/estufa.routes')(app);

app.listen(port, () => console.log("QualityNET Server Iniciado"));