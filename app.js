const express = require('express');
const mongoose = require('mongoose');
const pageRouter = require('./routers/pageRouter');
const courseRouter = require('./routers/courseRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log('DB connected succesfully!');
});

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routers
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

//Configs
const port = 3000;

app.listen(port, () => {  
  console.log(`App listening at http://localhost:${port}`);
});
