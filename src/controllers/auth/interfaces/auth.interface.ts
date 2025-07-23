import { Request, Response } from "express";

export type ExpressHandler = (req: Request, res: Response) => Promise<void>;

export interface IAuthController {
    register: ExpressHandler;
    verifyOtp: ExpressHandler;
    resendOtp: ExpressHandler;
    login: ExpressHandler;
    forgetPassword: ExpressHandler;
    resetPassword: ExpressHandler;
}
