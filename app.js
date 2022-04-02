var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var indexRouter = require('./routes/index');
const port = process.env.PORT || 5002;
var app = express();
const mongoose = require('mongoose');
const url = process.env.MONGODB_URL || 'mongodb+srv://anurag:anurag@cluster0.0qqig.mongodb.net/wordStore?retryWrites=true&w=majority';
const connect = mongoose.connect(url);
connect.then(() => {
  console.log('connected to DB successfully');
}).catch(e => {
  console.log('error occured ' + e);
})
//Sets handlebars configurations
app.engine(
  "hbs",
  hbs.engine({ extname: 'hbs', defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts" })
);
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;
