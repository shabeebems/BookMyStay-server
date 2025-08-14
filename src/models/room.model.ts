import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRoom extends Document {
    hotelId: Types.ObjectId;
    roomName: string;
    roomNumber: string;
    facilities: string[];
    sleeps: string;
    images: string[];
    description: string;
    isBlock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const RoomSchema: Schema<IRoom> = new Schema(
    {
        hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
        roomName: { type: String, required: true, trim: true },
        roomNumber: { type: String, required: true, trim: true },
        facilities: { type: [String], default: [] },
        sleeps: { type: String, required: true, trim: true },
        images: { type: [String], default: [] },
        description: { type: String, required: true, trim: true },
        isBlock: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const RoomModel = mongoose.model<IRoom>('Room', RoomSchema);

export default RoomModel;
