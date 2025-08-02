import { Router } from "express";
import { OwnerController } from "../controllers/owner/implementations/owner.controller";

const ownerRouter: Router = Router();

const ownerController = new OwnerController();

ownerRouter.put('/verify-documents', ownerController.verifyDocuments);

export default ownerRouter;
