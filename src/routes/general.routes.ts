import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenValidation";
import { GeneralController } from "../controllers/general/general.controller";

const generalRouter: Router = Router();

const generalController = new GeneralController()

generalRouter.get('/profile', authenticateToken(['owner', 'user']), generalController.getProfile);
generalRouter.put('/profile', authenticateToken(['owner', 'user']), generalController.updateImage);
generalRouter.get('/notification', authenticateToken(['owner', 'user']), generalController.getNotifications);
generalRouter.post('/change-password', authenticateToken(['owner', 'user']), generalController.changePassword);

export default generalRouter;
