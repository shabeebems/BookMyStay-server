import { Request, Response } from "express";

export type ExpressHandler = (req: Request, res: Response) => Promise<void>;

export interface IGeneralController {
    getProfile: ExpressHandler;
    updateImage: ExpressHandler;
    getNotifications: ExpressHandler;
    changePassword: ExpressHandler;
}
