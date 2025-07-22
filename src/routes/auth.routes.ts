import { Router } from "express";
import { AuthController } from "../controllers/auth/implementations/auth.controller";
import { loginSchema, registerSchema } from "../schemas/user.schema";
import { validate } from "../middlewares/validate";

const authRouter: Router = Router();

const authController = new AuthController();

authRouter.post('/users', validate(registerSchema), authController.register);
authRouter.post('/verify-otp', authController.verifyOtp);
authRouter.post('/resend-otp', authController.resendOtp);
authRouter.post('/login', validate(loginSchema), authController.login);

export default authRouter;
