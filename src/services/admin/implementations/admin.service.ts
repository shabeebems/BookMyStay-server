import { Request } from "express";
import { Messages } from "../../../constants/messages";
import { NotificationRepository } from "../../../repositories/notification.repositories";
import { UserRepository } from "../../../repositories/user.repositories";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export class AdminService {
    private userRepository = new UserRepository();
    private notificationRepository = new NotificationRepository();

    public async fetchUsers(role: string): Promise<ServiceResponse> {
        const users = await this.userRepository.findByRole(role)
        return { success: true, message: Messages.FETCH_USERS_SUCCESS, data: users };
    }

    public async blockUser(_id: string): Promise<ServiceResponse> {
        await this.userRepository.blockById(_id)
        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }

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
