import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import connectDB from './config/db';
import cors from 'cors';
import session from 'express-session';
import './utils/passport';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import adminRouter from './routes/admin.routes';
import ownerRouter from './routes/owner.routes';
import generalRouter from './routes/general.routes';
import googleAuthRouter from './routes/googleAuth.routes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

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

app.use('/api/admin', adminRouter);
app.use('/api/owner', ownerRouter);
app.use('/api', generalRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

