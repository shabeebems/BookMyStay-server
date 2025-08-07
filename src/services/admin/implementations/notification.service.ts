import { Request } from "express";
import { Messages } from "../../../constants/messages";
import { UserRepository } from "../../../repositories/implementations/user.repositories";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { INotificationService } from "../interfaces/notification.interface";
import { NotificationRepository } from "../../../repositories/implementations/notification.repositories";

export class NotificationService implements INotificationService {
    private userRepository = new UserRepository();
    private notificationRepository = new NotificationRepository();

    public async notification(): Promise<ServiceResponse> {
        const notifications = await this.notificationRepository.findAll()
        return { success: true, message: Messages.FETCH_USERS_SUCCESS, data: notifications };
    }

    public async updateNotificationStatus(req: Request): Promise<ServiceResponse> {
        
        const { requestStatus, rejectReason } = req.body
        const notification = await this.notificationRepository.statusChange(
            req.params.notificationId, requestStatus, rejectReason
        );

        if(!notification) return { success: false, message: Messages.FETCH_USERS_SUCCESS };
        if(requestStatus === "accepted") {
            await this.userRepository.verifyOwner(notification.userId, notification.documents)
        }
        
        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }
}
