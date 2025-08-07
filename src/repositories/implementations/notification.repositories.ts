import NotificationModel, { INotification } from "../../models/notification";
import { BaseRepository } from "./base.repositories";
import { INotificationRepository } from "../interfaces/notification.interface";

export class NotificationRepository
    extends BaseRepository<INotification>
    implements INotificationRepository
{
    constructor() {
        super(NotificationModel);
    }

    findAllByUserId = (userId: string): Promise<INotification[]> =>
        this.model.find({ userId });

    statusChange = (
        _id: string, requestStatus: string, rejectReason?: string
    ): Promise<INotification | null> => {
        const updateData: { requestStatus: string; rejectReason?: string } 
        = { requestStatus };

        if (requestStatus === "rejected" && rejectReason) {
            updateData.rejectReason = rejectReason;
        } else {
            updateData.rejectReason = undefined;
        }

        return this.model.findByIdAndUpdate(_id, updateData, { new: true });
    }
}
