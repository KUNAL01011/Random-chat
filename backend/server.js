import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import connectToMongoDB from './db/connectDB.js';

const app = express();
dotenv.config();


const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRouter);


app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
})