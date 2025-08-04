import { Request } from "express";
import { decodeToken } from "../../../utils/jwt";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { NotificationRepository } from "../../../repositories/notification.repositories";
import { INotificationService } from "../interfaces/notification.interface";

export class NotificationService implements INotificationService {
    private notificationRepository = new NotificationRepository();

    public async getNotifications(req: Request): Promise<ServiceResponse> {
        const decodeUser = await decodeToken(req)
        const notification = await this.notificationRepository.findAllByUserId(decodeUser?._id)
        return { success: true, message: "Profile fetch success", data: notification };
    }

}
