const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/routes/index');
const db = require('./config/dbController');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
db.connect();

app.use('/', router);


module.exports = app;
