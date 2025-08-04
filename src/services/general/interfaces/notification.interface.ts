import { Request } from "express";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export interface INotificationService {
    getNotifications(req: Request): Promise<ServiceResponse>;
}
