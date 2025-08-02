import NotificationModel, { INotification } from "../models/notification";
import { BaseRepository } from "./base.repositories";

export class NotificationRepository extends BaseRepository<INotification> {

    constructor() {
        super(NotificationModel);
    }
}