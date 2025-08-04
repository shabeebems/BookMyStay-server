import { Request } from "express";
import { Messages } from "../../../constants/messages";
import { NotificationRepository } from "../../../repositories/notification.repositories";
import { UserRepository } from "../../../repositories/user.repositories";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { INotificationService } from "../interfaces/notification.interface";

export class NotificationService implements INotificationService {
    private userRepository = new UserRepository();
    private notificationRepository = new NotificationRepository();

    public async notification(): Promise<ServiceResponse> {
        const notifications = await this.notificationRepository.findAll()
        return { success: true, message: Messages.FETCH_USERS_SUCCESS, data: notifications };
    }

    public async updateNotificationStatus(req: Request): Promise<ServiceResponse> {
        
        const notification = await this.notificationRepository.statusChange(
            req.params.notificationId,
            req.body.requestStatus,
            req.body.rejectReason
        );

        if(!notification) return { success: false, message: Messages.FETCH_USERS_SUCCESS };
        if(req.body.requestStatus === "accepted") {
            await this.userRepository.updateIsVerified(notification.userId)
        }
        
        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }
}
