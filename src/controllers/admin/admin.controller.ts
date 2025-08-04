import { Request, Response } from "express";
import { NotificationService } from "../../services/admin/implementations/notification.service";
import { HttpStatus } from "../../constants/statusCode";
import { Messages } from "../../constants/messages";
import { UserService } from "../../services/admin/implementations/user.service";
import { IAdminController } from ".//admin.interface";

export class AdminController implements IAdminController {
    private notificationService = new NotificationService();
    private userService = new UserService();

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


    public fetchUsers = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.userService.fetchUsers(req.params.role));

    public blockUser = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.userService.blockUser(req.body.userId));

    public notification = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.notificationService.notification());

    public updateNotificationStatus = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.notificationService.updateNotificationStatus(req));
}
