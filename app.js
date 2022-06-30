const express = require('express');
const app = express();
app.use(express.json())
app.get('/', function(req, res){
   //Create an error and pass it to the next function
   let err = new Error("Something went wrong");
   err.statusCode=403
   console.log(err.statusCode)
   next(err);
});

/*
 * other route handlers and middleware here
 * ....
 */

//An error handling middleware
app.use((err, req, res, next)=>{
   if (err.status===403){
       res.json({
        "message": "Forbidden",
        "statusCode": 403
       })
    }
   if (err.statusCode===403){
        res.json({
        "message": "Authentication Required",
        "statusCode": 401
        })
    }
    console.log(err.statusCode)
    res.json({statusCode: err.statusCode})
});

const port = 3000;
app.listen(port, () => console.log('Server is listening on port', port));
