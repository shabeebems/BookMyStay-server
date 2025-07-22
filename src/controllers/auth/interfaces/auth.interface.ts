import { Request, Response } from "express";

type ExpressHandler = (req: Request, res: Response) => Promise<void>;

export interface IAuthController {
    register : ExpressHandler;
}