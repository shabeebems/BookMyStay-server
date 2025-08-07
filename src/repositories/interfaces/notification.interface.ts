import { IBaseRepository } from "./base.interface";
import { INotification } from "../../models/notification";

export interface INotificationRepository extends IBaseRepository<INotification> {
    findAllByUserId(userId: string): Promise<INotification[]>;
    statusChange(
        _id: string, requestStatus: string, rejectReason?: string
    ): Promise<INotification | null>;
}
