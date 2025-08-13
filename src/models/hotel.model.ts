import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IHotel extends Document {
    ownerId: Types.ObjectId;
    name: string;
    registrationNumber: string;
    images: string[];
    documents: string[];
    facilities: string[];
    description: string;
    isBlock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const HotelSchema: Schema<IHotel> = new Schema(
    {
        ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true, trim: true },
        images: { type: [String], default: [] },
        documents: { type: [String], default: [] },
        facilities: { type: [String], default: [] },
        description: { type: String, required: true, trim: true },
        isBlock: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const HotelModel = mongoose.model<IHotel>('Hotel', HotelSchema);

export default HotelModel;
