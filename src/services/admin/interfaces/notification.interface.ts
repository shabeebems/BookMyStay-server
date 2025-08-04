import { Request } from "express";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export interface INotificationService {
    notification(): Promise<ServiceResponse>;
    updateNotificationStatus(req: Request): Promise<ServiceResponse>;
}
