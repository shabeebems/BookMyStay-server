import { BaseRepository } from "./base.repositories";
import HotelModel, { IHotel } from "../../models/hotel.model";
import { IHotelRepository } from "../interfaces/hotel.interface";
import { Types } from "mongoose";

export class HotelRepository
    extends BaseRepository<IHotel>
    implements IHotelRepository
{
    constructor() {
        super(HotelModel);
    }

    findByOwnerId(ownerId: Types.ObjectId): Promise<IHotel[]> {
        return this.model.find({ ownerId });
    }
}
