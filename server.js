const express = require('express');
const {engine} = require('express-handlebars');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT;

connectDB();

// set express-handlebars as the deafault template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended:false}));

app.use('/articles', require('./routes/articles'));
app.use('/', require('./routes/home'));

app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`));