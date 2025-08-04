import { Router } from "express";
import { OwnerController } from "../controllers/owner/owner.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const ownerRouter: Router = Router();

const ownerController = new OwnerController();

ownerRouter.post('/owner-notifications', authenticateToken(['owner']), ownerController.uploadOwnerDocuments);

export default ownerRouter;
