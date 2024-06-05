var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');



const uri = "mongodb+srv://milaeloc:milaeloc@mycluster.st1emty.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
      try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      }
      catch (error) {
        console.error(error);
        process.exit(1); // Exit the application on error
      }
}

run().catch(console.dir);



var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//requirements
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Preventing CORS errors


app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method==='OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


//conecction to files in routes MIDDLEWARES


app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler    THIS IS A BLOCK OF CODE, DOESN'T REALLY INTERFER

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
