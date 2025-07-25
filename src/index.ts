import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import authRouter from './routes/auth.routes';
import connectDB from './config/db';
import cors from 'cors';
import session from 'express-session';
import './utils/passport';  // <-- Add this line (Important!)
import googleAuthRouter from './routes/googleAuth.routes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/auth', googleAuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

