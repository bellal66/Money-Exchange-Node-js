const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
var createError = require('http-errors');
//require('./controllers/passport.js')(passport);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'tyugvrt6yuvty', 
    resave: true, 
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./controllers/index.js')(app,passport);
require('./controllers/account.js')(app,passport)
app.use(function(req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
app.listen(4004);