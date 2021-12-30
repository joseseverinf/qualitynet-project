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
require('./routes/client.routes')(app);
require('./routes/stove.routes')(app);
require('./routes/sale.routes')(app);
require('./routes/maintenance.routes')(app);
require('./routes/log.routes')(app);

const server = app.listen(port, () => {
  console.log(`App QualityNET running on port ${port}`);
});