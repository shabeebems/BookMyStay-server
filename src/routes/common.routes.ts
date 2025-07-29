import { Router } from "express";
import { CommonController } from "../controllers/common/implementations/profile.controller";

const commonRouter: Router = Router();

const commonController = new CommonController()

commonRouter.get('/profile', commonController.getProfile);
commonRouter.put('/profile', commonController.updateImage);

export default commonRouter;
