import { Request, Response } from "express";
import { IAuthController } from "../interfaces/auth.interface";
import { AuthService } from "../../../services/auth/implementations/auth.service";
import { HttpStatus } from "../../../constants/statusCode";
import { Messages } from "../../../constants/messages";

export class AuthController implements IAuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { confirmPassword, ...payload } = req.body
            const { success, message } = await this.authService.register(payload);
            
            if (success) {
                res.status(HttpStatus.OK).json({ success, message })
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ success, message })
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: Messages.INTERNAL_SERVER_ERROR })
        }
    }

    public verifyOtp = async (req: Request, res: Response): Promise<void> => {
        try {
            const { success, message } = await this.authService.verifyOtp(req.body);
            
            if (success) {
                res.status(HttpStatus.OK).json({ success, message })
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ success, message })
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: Messages.INTERNAL_SERVER_ERROR })
        }
    }

    public resendOtp = async (req: Request, res: Response): Promise<void> => {
        try {
            const { success, message } = await this.authService.resendOtp(req.body);
            
            if (success) {
                res.status(HttpStatus.OK).json({ success, message })
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ success, message })
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: Messages.INTERNAL_SERVER_ERROR })
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { success, message } = await this.authService.login(res, req.body);
            
            if (success) {
                res.status(HttpStatus.OK).json({ success, message })
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ success, message })
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: Messages.INTERNAL_SERVER_ERROR })
        }
    }
}
