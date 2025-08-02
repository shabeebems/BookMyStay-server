import { Router } from "express";
import passport from "passport";
import { UserRepository } from "../repositories/user.repositories";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

const googleAuthRouter: Router = Router();
const userRepository = new UserRepository();

// ---------- Google OAuth Routes ----------
googleAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleAuthRouter.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    async (req, res) => {
        const user = req.user as any;
        let loggedUser = await userRepository.findByEmail(user.emails[0].value)
        if(!loggedUser) {
            const newUser = {
                email: user.emails[0].value,
                name: user.displayName,
                role: 'user'
            }
            loggedUser = await userRepository.create(newUser)
        }

        const payload = { _id: loggedUser._id, email: loggedUser.email, role: loggedUser.role, isVerified: true };
        const token = await createAccessToken(res, payload);
        await createRefreshToken(res, payload);

        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
    }
);

export default googleAuthRouter;
