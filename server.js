require('dotenv').config();

const ENV = require('./utils/Env')
const express = require('express');
const app = express();

require('./start/Database')();
require('./start/LoggerCustom')(app);
require('./start/Routes')(app);

const port = ENV.get("PORT",2000)
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

module.exports = app