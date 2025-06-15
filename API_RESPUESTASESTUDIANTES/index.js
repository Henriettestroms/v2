const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();

const routes = require('./src/routes/index');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT_API, () => {
    console.log('Server running!');
});