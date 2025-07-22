import { Messages } from "../../../constants/messages";
import { UserRepository } from "../../../repositories/user.repositories"
import sendOtp from "../../../utils/sendOtp";
import { IAuthService, ServiceResponse } from "../interfaces/auth.interface";
import bcrypt from 'bcrypt';
import redis from '../../../config/redis';
import { IUser } from "../../../models/user.model";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt";
import { Response } from "express";

export class AuthService implements IAuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async register(data: IUser): Promise<ServiceResponse> {
        try {
            const { email } = data
            const existingUser = await this.userRepository.findByEmail(email)
            if(existingUser) {
                return { success: false, message: Messages.EMAIL_ALREADY_EXISTS }                
            }

            data.password = await bcrypt.hash(data.password, 10);
            const otp = Math.floor(1000 + Math.random() * 9000);
            
            await sendOtp(email, otp)
            await redis.set(`user:${email}`, JSON.stringify({ ...data, otp }), 'EX', 300 );

            return { success: true, message: Messages.USER_CREATED_SUCCESS }                
        } catch (error) {
            return { success: false, message: Messages.INTERNAL_SERVER_ERROR }                
        }
    }

    public async verifyOtp(data: { email: string, otp: string, role: string }): Promise<ServiceResponse> {
        try {
            const redisData = await redis.get(`user:${data.email}`);
            if(redisData) {
                const parsedData = JSON.parse(redisData);
                if(parsedData.otp == data.otp) {
                    const { otp, ...payload } = parsedData
                    payload.role = data.role
                    payload.isVerified = false
                    if(data.role === "user") {
                        payload.isVerified = true
                    }
                    await this.userRepository.create(payload)
                    await redis.del(`user:${data.email}`);
                    return { success: true, message: Messages.OTP_VERIFICATION_SUCCESS };  
                } else {
                    return { success: false, message: Messages.WRONG_OTP };  
                }
            }
            return { success: false, message: Messages.OTP_EXPIRED };
        } catch (error) {
            return { success: false, message: Messages.INTERNAL_SERVER_ERROR };
        }             
    }

    public async resendOtp(data: { email: string }): Promise<ServiceResponse> {
        try {
            const redisData = await redis.get(`user:${data.email}`);
            if(redisData) {
                const parsedData = JSON.parse(redisData);
                const newOtp = Math.floor(1000 + Math.random() * 9000);
                parsedData.otp = newOtp;

                await redis.set(`user:${data.email}`, JSON.stringify(parsedData));
                await sendOtp(data.email, newOtp)

                return { success: true, message: "resended" };
            }
            return { success: false, message: "time over" };
        } catch (error) {
            return { success: false, message: Messages.INTERNAL_SERVER_ERROR };
        }             
    }

    public async login(res: Response, data: { email: string, password: string, role: string }): Promise<ServiceResponse> {
        try {
            const { email, password, role } = data
            const existingUser = await this.userRepository.findByEmail(email)
            if(!existingUser) {
                return { success: false, message: "User not found" };
            }
            if(role !== existingUser.role) {
                return {
                    success: false,
                    message: `You are not ${role}, go to ${existingUser.role} page`,
                };
            }

            const checkPassword = await bcrypt.compare(password, existingUser.password);
            if(!checkPassword) {
                return { success: false, message: "INCORRECT_PASSWORD" };
            }

            if (existingUser.isBlock) {
                return { success: false, message: "BLOCK_USER" };
            }

            const payload = { _id: existingUser._id, email, role };
            await createAccessToken(res, payload)
            await createRefreshToken(res, payload)
            
            return { success: true, message: "Login completed" };
        } catch (error) {
            return { success: false, message: Messages.INTERNAL_SERVER_ERROR };
        }             
    }

}