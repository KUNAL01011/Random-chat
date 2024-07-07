import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import connectToMongoDB from './db/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());

// routes
app.use("/api/auth",authRouter);


app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
})