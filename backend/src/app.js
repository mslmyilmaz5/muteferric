require('dotenv').config();

// for express
const express = require('express');
const app = express();

// rest of the packages
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// database
const connect_db = require('./api/db/connection');


// routers
const poetryRouter = require("./api/routes/poetryRoute");
const authRouter = require("./api/routes/authRoute");
const userRouter = require("./api/routes/userRoute");
const poetRouter = require("./api/routes/poetRoute");



// CORS options
const corsOptions = {
    origin: ['http://localhost:5173', 'https://muteferric.onrender.com'], // Allow both localhost and your deployed frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/v1/poetry', poetryRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/poet', poetRouter);



const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connect_db(process.env.MONGODB_URL); // first make sure that db connection ok.
        app.listen(port, () => // Afterwards, start listening on the server.
            console.log(`Listening on port ${port}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
