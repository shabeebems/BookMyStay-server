import { Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

import redis from "../../../config/redis";
import sendOtp from "../../../utils/sendOtp";
import sendResetLink from "../../../utils/sendResetLink";
import { clearRefreshToken, createAccessToken, createRefreshToken } from "../../../utils/jwt";
import { IUser } from "../../../models/user.model";
import { UserRepository } from "../../../repositories/user.repositories";
import { IAuthService, ServiceResponse } from "../interfaces/auth.interface";
import { Messages } from "../../../constants/messages";

export class AuthService implements IAuthService {
    private userRepository = new UserRepository();

    public async register(data: IUser): Promise<ServiceResponse> {
        const { email } = data;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) return { success: false, message: Messages.EMAIL_EXISTS };

        data.password = await bcrypt.hash(data.password, 10);
        const otp = Math.floor(1000 + Math.random() * 9000);

        await sendOtp(email, otp);
        await redis.set(`user:${email}`, JSON.stringify({ ...data, otp }), "EX", 300);

        return { success: true, message: Messages.USER_REGISTERED };
    }

    public async verifyOtp(data: { email: string; otp: string; role: string }): Promise<ServiceResponse> {
        const redisData = await redis.get(`user:${data.email}`);
        if (!redisData) return { success: false, message: Messages.OTP_EXPIRED };

        const parsedData = JSON.parse(redisData);
        if (parsedData.otp != data.otp) return { success: false, message: Messages.OTP_INVALID };

        const { otp, ...payload } = parsedData;
        payload.role = data.role;
        payload.isVerified = data.role === "user";

        await this.userRepository.create(payload);
        await redis.del(`user:${data.email}`);

        return { success: true, message: Messages.OTP_VERIFIED };
    }

    public async resendOtp({ email }: { email: string }): Promise<ServiceResponse> {
        const redisData = await redis.get(`user:${email}`);
        if (!redisData) return { success: false, message: Messages.OTP_NOT_FOUND };

        const parsedData = JSON.parse(redisData);
        const newOtp = Math.floor(1000 + Math.random() * 9000);
        parsedData.otp = newOtp;

        await redis.set(`user:${email}`, JSON.stringify(parsedData));
        await sendOtp(email, newOtp);

        return { success: true, message: Messages.OTP_RESENT };
    }

    public async login(res: Response, data: { email: string; password: string; role: string }): Promise<ServiceResponse> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) return { success: false, message: Messages.USER_NOT_FOUND };
        if (data.role !== user.role) {
            return { 
                success: false,
                message: `You are not ${data.role}, go to ${user.role} page` 

            };
        }
        if (!(await bcrypt.compare(data.password, user.password))) return { success: false, message: Messages.PASSWORD_INCORRECT };
        if (user.isBlock) return { success: false, message: Messages.USER_BLOCKED };

        const payload = { _id: user._id, email: user.email, role: user.role };
        const token = await createAccessToken(res, payload);
        await createRefreshToken(res, payload);
        console.log(token)
        return { success: true, message: Messages.LOGIN_SUCCESS, token };
    }

    public async forgetPassword({ email, role }: { email: string; role: string }): Promise<ServiceResponse> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return { success: false, message: Messages.USER_NOT_FOUND };

        const token = crypto.randomBytes(20).toString("hex");
        await redis.set(`password_reset:${token}`, JSON.stringify({ email }), "EX", 900);

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&role=${role}`;
        await sendResetLink(email, resetLink);

        return { success: true, message: Messages.RESET_LINK_SENT };
    }

    public async resetPassword({ token, password }: { token: string; password: string }): Promise<ServiceResponse> {
        const redisData = await redis.get(`password_reset:${token}`);
        if (!redisData) return { success: false, message: Messages.RESET_FAILED };

        const { email } = JSON.parse(redisData);
        const user = await this.userRepository.findByEmail(email);
        if (!user) return { success: false, message: Messages.USER_NOT_FOUND };

        const hashed = await bcrypt.hash(password, 10);
        await this.userRepository.updatePasswordByEmail(email, hashed);
        await redis.del(`password_reset:${token}`);

        return { success: true, message: Messages.PASSWORD_RESET_SUCCESS };
    }

    public async logout(res: Response): Promise<ServiceResponse> {
        await clearRefreshToken(res)
        return { success: true, message: Messages.PASSWORD_RESET_SUCCESS };
    }
}
