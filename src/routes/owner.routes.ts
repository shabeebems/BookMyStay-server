import { Router } from "express";
import { OwnerController } from "../controllers/owner/owner.controller";
import { authenticateToken } from "../middlewares/tokenValidation";
import { validate } from "../middlewares/zodValidate";
import { hotelSchema } from "../schemas/hotel.schema";

const ownerRouter: Router = Router();

const ownerController = new OwnerController();

ownerRouter.post('/owner-notifications', authenticateToken(['owner']), ownerController.uploadOwnerDocuments);
ownerRouter.get('/hotels', authenticateToken(['owner']), ownerController.fetchHotels);
ownerRouter.post('/hotels', authenticateToken(['owner']), validate(hotelSchema), ownerController.addHotel);
ownerRouter.put('/hotels/:hotelId', authenticateToken(['owner']), validate(hotelSchema), ownerController.updateHotel);

export default ownerRouter;
