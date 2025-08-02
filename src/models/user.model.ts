import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
    city: string;
    state: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    mobile: number;
    image: string;
    documents: string[];
    address: IAddress;
    password: string;
    role: string;
    isVerified: boolean;
    isBlock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AddressSchema: Schema<IAddress> = new Schema(
  {
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true }
  }, { _id: false }
);

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        mobile: { type: Number },
        image: { type: String },
        documents: { type: [String] },
        address: { type: AddressSchema },
        password: { type: String, trim: true },
        role: { type: String, enum: ['user', 'owner', 'admin'] },
        isVerified: { type: Boolean, default: true },
        isBlock: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
