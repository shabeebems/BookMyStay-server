import { Response } from "express";
import { IUser } from "../../../models/user.model";

export type ServiceResponse = {
    success: boolean;
    message: string;
    data?: object | null;
    token?: string;
};

export interface IAuthService {
    register(data: IUser): Promise<ServiceResponse>;
    verifyOtp(data: { email: string; otp: string; role: string }): Promise<ServiceResponse>;
    resendOtp(data: { email: string }): Promise<ServiceResponse>;
    login(res: Response, data: { email: string; password: string; role: string }): Promise<ServiceResponse>;
    forgetPassword(data: { email: string; role: string }): Promise<ServiceResponse>;
    resetPassword(data: { token: string; password: string }): Promise<ServiceResponse>;
    logout(res: Response): Promise<ServiceResponse>;
}
