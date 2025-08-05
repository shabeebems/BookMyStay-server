import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenValidation";
import { GeneralController } from "../controllers/general/general.controller";
import { validate } from "../middlewares/zodValidate";
import { profileUpdateSchema } from "../schemas/user.schema";

const generalRouter: Router = Router();

const generalController = new GeneralController()

generalRouter.get('/profile', authenticateToken(['owner', 'user', 'admin']), generalController.getProfile);
generalRouter.post('/profile', validate(profileUpdateSchema), authenticateToken(['owner', 'user', 'admin']), generalController.updateProfile);
generalRouter.put('/profile', authenticateToken(['owner', 'user', 'admin']), generalController.updateImage);
generalRouter.get('/notification', authenticateToken(['owner', 'user']), generalController.getNotifications);
generalRouter.post('/change-password', authenticateToken(['owner', 'user', 'admin']), generalController.changePassword);

export default generalRouter;
