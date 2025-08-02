import { Request, Response } from "express";
import { HttpStatus } from "../../../constants/statusCode";
import { Messages } from "../../../constants/messages";
import { OwnerService } from "../../../services/owner/implementations/owner.service";

export class OwnerController {
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

    public verifyDocuments = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.ownerService.verifyDocuments(req.body.documents, req));

}
