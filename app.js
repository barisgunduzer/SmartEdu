const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRouter = require('./routers/pageRouter');
const courseRouter = require('./routers/courseRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');
const app = express();

//Connect DB
mongoose
  .connect('mongodb+srv://db-user:n5XHMBHzjuNywzIT@cluster0.pvobr.mongodb.net/smartedu-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connected succesfully!');
  });

//Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routers
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

//Configs
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
