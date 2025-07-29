import { Router } from "express";
import { AdminController } from "../controllers/admin/implementations/admin.controller";

const adminRouter: Router = Router();

const adminController = new AdminController();

adminRouter.get('/users/:role', adminController.fetchUsers);
adminRouter.put('/user', adminController.blockUser);

export default adminRouter;
