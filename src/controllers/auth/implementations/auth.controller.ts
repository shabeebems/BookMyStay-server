import { Request, Response } from "express";
import { IAuthController } from "../interfaces/auth.interface";
import { AuthService } from "../../../services/auth/implementations/auth.service";
import { HttpStatus } from "../../../constants/statusCode";
import { Messages } from "../../../constants/messages";

interface ResponsePayload {
    success: boolean;
    message: string;
    [key: string]: any;
}

export class AuthController implements IAuthController {
    private authService = new AuthService();

    private handleResponse(res: Response, payload: ResponsePayload): void {
        const { success, message, ...data } = payload;
        const status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        res.status(status).json({ success, message, ...data });
    }

    private async handleRequest(
        res: Response,
        fn: () => Promise<ResponsePayload>
    ): Promise<void> {
        try {
            const payload = await fn();
            this.handleResponse(res, payload);
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
