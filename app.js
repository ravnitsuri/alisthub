var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db.js');
   var csv = require("fast-csv");

  var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));





   
    // app.post('/upload', function(req, res) {
    // var storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, './public/images/customer/csv/');
    //     },
    //     filename: function (req, file, cb) {
    //         //var datetimestamp = Date.now();
    //        // +"."+file.originalname.split('.')[file.originalname.split('.').length -1])
    //         cb(null,file.originalname);
    //     }
    // });
    // var upload = multer({ 
    //                 storage: storage
    //             }).single('file');
    //     upload(req,res,function(err){
    //         if(err){
    //              res.json({error_code:1,err_desc:err});
    //              return;
    //         }
    //          res.json({error_code:0,err_desc:null});
    //     });
    // });




app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
var users = require('./routes/users');
var customers = require('./routes/customers')(app, express);
//For financial setting of user
var common = require('./routes/common')(app, express);
//For my account managment
var profile = require('./routes/profile')(app, express);
//For event setting
var venues = require('./routes/event_setting')(app, express); 
//For seller user managment
var seller_user = require('./routes/seller_user')(app, express);
//For financial setting of user
var account = require('./routes/account')(app, express);
//For event managment 
require('./routes/event')(app, express);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
