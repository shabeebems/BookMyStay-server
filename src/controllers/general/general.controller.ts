import { Request, Response } from "express";
import { HttpStatus } from "../../constants/statusCode";
import { Messages } from "../../constants/messages";
import { ProfileService } from "../../services/general/implementations/profile.service";
import { NotificationService } from "../../services/general/implementations/notification.service";
import { IGeneralController } from "./general.interface";

export class GeneralController implements IGeneralController {
    private profileService = new ProfileService();
    private notificationService = new NotificationService();

    private async handleRequest<T>(
        res: Response,
        fn: () => Promise<{ success: boolean; message: string; data?: T }>
    ): Promise<void> {
        try {
            const { success, message, data } = await fn();
            const status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
            res.status(status).json({ success, message, data });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: Messages.INTERNAL_SERVER_ERROR,
            });
        }
    }


    public getProfile = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.profileService.getProfile(req));

    public updateImage = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.profileService.updateImage(req.body));

    public changePassword = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.profileService.changePassword(req));
    
    public getNotifications = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.notificationService.getNotifications(req));

}
