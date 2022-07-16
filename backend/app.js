const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');


const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
   // enable cors only in development
   app.use(cors());
 }
 
 // helmet helps set a variety of headers to better secure your app
 app.use(
   helmet.crossOriginResourcePolicy({ 
     policy: "cross-origin" 
   })
 );
 
 // Set the _csrf token and create req.csrfToken method
 app.use(
   csurf({
     cookie: {
       secure: isProduction,
       sameSite: isProduction && "Lax",
       httpOnly: true
     }
   })
 );
// const booksRouter = require('./routes/Bookings');
// app.use('/Bookings', booksRouter);
// const reviewsRouter = require('./routes/Reviews');
// app.use('/Reviews', reviewsRouter);
// const spotsRouter = require('./routes/Spots');
// app.use('/Spots', spotsRouter);
// const usersRouter = require('./routes/users');
// app.use('/Users', usersRouter);

app.use(express.json())

//connect all routes

app.use(routes);

// app.get('/', function(req, res){
//    //Create an error and pass it to the next function
//    let err = new Error("Something went wrong");
//    err.statusCode=403
//    console.log(err.statusCode)
//    next(err);
// });

/*
 * other route handlers and middleware here
 * ....
 */

//An error handling middleware
// app.use((err, req, res, next)=>{
//    if (err.status===403){
//        res.json({
//         "message": "Forbidden",
//         "statusCode": 403
//        })
//     }
//    if (err.statusCode===403){
//         res.json({
//         "message": "Authentication Required",
//         "statusCode": 401
//         })
//     }
//     console.log(err.statusCode)
//     res.json({statusCode: err.statusCode})
// });

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
   const err = new Error("The requested resource couldn't be found.");
   err.title = "Resource Not Found";
   err.errors = ["The requested resource couldn't be found."];
   err.status = 404;
   next(err);
 });

 const { ValidationError } = require('sequelize');

 // Process sequelize errors
 app.use((err, _req, _res, next) => {
   // check if error is a Sequelize error:
   if (err instanceof ValidationError) {
     err.errors = err.errors.map((e) => e.message);
     err.title = 'Validation error';
   }
   next(err);
 });

// Error formatter
app.use((err, _req, res, _next) => {
   res.status(err.status || 500);
   console.error(err);
   res.json({
     title: err.title || 'Server Error',
     message: err.message,
     errors: err.errors,
     stack: isProduction ? null : err.stack
   });
 });


// const port = 3000;
// app.listen(port, () => console.log('Server is listening on port', port));
module.exports = app;