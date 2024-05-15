// importing libraries
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// importing the database connection
const connectDB = require('./db');
connectDB();

// setting up the port
const PORT = process.env.PORT || 5000;



// importing the routes
const userRoutes = require('./routes/userRoutes');


// middleware
app.use(cors());
app.use(express.json());


// default route
app.get('/',(req,res)=>{
    if(mongoose.connection.readyState === 1){
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'To do List',
            "database": "Connected to MongoDb"
        }])
    }
    else{
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'To do List',
            "database": "Not connected to MongoDb"
        }])
    }
    
})





// using the routes

app.use('/api',userRoutes);



// listening to the server

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})



module.exports = app;