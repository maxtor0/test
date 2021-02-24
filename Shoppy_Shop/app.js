'use strict';

require('dotenv').config();

const express = require("express");
const app = express();
const bootstrap = require('./src/bootstrap');

bootstrap(app);

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME);
