import { Request, Response } from "express";
import { HttpStatus } from "../../constants/statusCode";
import { Messages } from "../../constants/messages";
import { OwnerService } from "../../services/owner/implementations/owner.service";
import { IOwnerController } from "./owner.interface";

export class OwnerController implements IOwnerController {
    private ownerService = new OwnerService();

    private async handleRequest<T>(
        res: Response,
        fn: () => Promise<{ success: boolean; message: string; data?: T }>
    ): Promise<void> {
        try {
            const { success, message, data } = await fn();
            const status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
            res.status(status).json({ success, message, data });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: Messages.INTERNAL_SERVER_ERROR,
            });
        }
    }

    public uploadOwnerDocuments = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.uploadOwnerDocuments(req.body.documents, req));

    public fetchHotels = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.fetchHotels(req));
    
    public addHotel = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.addHotel(req));

    public updateHotel = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.updateHotel(req));

    public blockHotel = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.blockHotel(req));

    public addRoom = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.addRoom(req));

    public fetchRooms = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.fetchRooms(req));
}
