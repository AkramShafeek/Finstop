// config
require('express-async-errors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cors = require('cors');

// express
const express = require('express');
const app = express();

// database
const connectToMongo = require('./database/dbConnect');

// cors origins
const corsOriginsDevelopment = ['http://localhost:3000'];
// yet to include origin for production
const corsOriginsProduction = [];

// routers
const userRouter = require('./routes/userRoutes');

// error handler middlewares
const errorHandlerMiddleware = require('./middleware/errorHandler');

// middlewares
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? corsOriginsProduction : corsOriginsDevelopment }));
app.use(express.json());
app.use('/public/error404/',express.static(path.join(__dirname,'public/error404')));


// user routes
app.use('/api/v1/user/', userRouter);

// error handlers
app.use(errorHandlerMiddleware);
app.use('*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"public/error404","index.html"));
    // res.status(404).send("Error 404 boss");
})

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectToMongo();
        console.log("Connected to database successfully");
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    } catch (error) {
        console.log("Couldn't start server due to some error");
        console.log(error);
    }
}

startServer();