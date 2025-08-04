import { Request, Response } from "express";

export type ExpressHandler = (req: Request, res: Response) => Promise<void>;

export interface IAdminController {
    fetchUsers: ExpressHandler;
    blockUser: ExpressHandler;
    notification: ExpressHandler;
    updateNotificationStatus: ExpressHandler;
}
