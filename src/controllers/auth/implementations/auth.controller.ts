import { Request, Response } from "express";
import { IAuthController } from "../interfaces/auth.interface";
import { AuthService } from "../../../services/auth/implementations/auth.service";
import { HttpStatus } from "../../../constants/statusCode";
import { Messages } from "../../../constants/messages";

export class AuthController implements IAuthController {
    private authService = new AuthService();

    private handleResponse(res: Response, success: boolean, message: string): void {
        const status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        res.status(status).json({ success, message });
    }

    private async handleRequest(
        res: Response,
        fn: () => Promise<{ success: boolean; message: string }>
    ): Promise<void> {
        try {
            const { success, message } = await fn();
            this.handleResponse(res, success, message);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: Messages.INTERNAL_SERVER_ERROR,
            });
        }
    }

    public register = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.register(req.body));

    public verifyOtp = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.verifyOtp(req.body));

    public resendOtp = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.resendOtp(req.body));

    public login = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.login(res, req.body));

    public forgetPassword = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.forgetPassword(req.body));

    public resetPassword = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.resetPassword(req.body));
}
