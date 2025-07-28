import { Request, Response } from "express";
import { AdminService } from "../../../services/admin/implementations/admin.service";
import { HttpStatus } from "../../../constants/statusCode";
import { Messages } from "../../../constants/messages";

export class AdminController {
    private adminService = new AdminService();

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


    public fetchUsers = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.adminService.fetchUsers(req.params.role));
}
