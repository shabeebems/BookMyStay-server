import { Router } from "express";
import { CommonController } from "../controllers/common/implementations/profile.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const commonRouter: Router = Router();

const commonController = new CommonController()

commonRouter.get('/profile', authenticateToken(['owner', 'user']), commonController.getProfile);
commonRouter.put('/profile', authenticateToken(['owner', 'user']), commonController.updateImage);
commonRouter.get('/notification', authenticateToken(['owner', 'user']), commonController.getNotifications);

export default commonRouter;
