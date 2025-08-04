import { Router } from "express";
import { AdminController } from "../controllers/admin/admin.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const adminRouter: Router = Router();

const adminController = new AdminController();

adminRouter.get('/users/:role', authenticateToken(['admin']), adminController.fetchUsers);
adminRouter.put('/user', authenticateToken(['admin']), adminController.blockUser);
adminRouter.get('/notification', authenticateToken(['admin']), adminController.notification);
adminRouter.put('/notification/:notificationId', authenticateToken(['admin']), adminController.updateNotificationStatus);

export default adminRouter;
