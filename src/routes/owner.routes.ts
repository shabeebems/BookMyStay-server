import { Router } from "express";
import { OwnerController } from "../controllers/owner/implementations/owner.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const ownerRouter: Router = Router();

const ownerController = new OwnerController();

ownerRouter.put('/verify-documents', authenticateToken(['owner']), ownerController.verifyDocuments);
ownerRouter.get('/check_isVerified', authenticateToken(['owner']), ownerController.checkIsVerified);

export default ownerRouter;
