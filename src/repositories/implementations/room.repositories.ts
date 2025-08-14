import { BaseRepository } from "./base.repositories";
import { IRoomRepository } from "../interfaces/room.interface";
import RoomModel, { IRoom } from "../../models/room.model";
import { Types } from "mongoose";

export class RoomRepository
    extends BaseRepository<IRoom>
    implements IRoomRepository
{
    constructor() {
        super(RoomModel);
    }

    findByHotelId(hotelId: Types.ObjectId | string) {
        return this.model.find({ hotelId });
    }

}
