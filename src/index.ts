import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';
import connectDB from './config/db';
import cors from 'cors';

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
