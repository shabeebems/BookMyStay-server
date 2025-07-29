import { Request, Response } from "express";
import { AdminService } from "../../../services/admin/implementations/admin.service";
import { HttpStatus } from "../../../constants/statusCode";
import { Messages } from "../../../constants/messages";
import { CommonService } from "../../../services/common/implementations/common.service";

export class CommonController {
    private commonService = new CommonService();

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


    public getProfile = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.commonService.getProfile(req));

    public updateImage = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.commonService.updateImage(req.body));
}
