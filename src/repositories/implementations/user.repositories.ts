import { Types } from "mongoose";
import UserModel, { IUser } from "../../models/user.model";
import { BaseRepository } from "./base.repositories";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../interfaces/user.interface";

export class UserRepository
    extends BaseRepository<IUser>
    implements IUserRepository
{
    constructor() {
        super(UserModel);
    }

    findByEmail = (email: string): Promise<IUser | null> =>
        this.model.findOne({ email });

    updatePasswordByEmail = (email: string, password: string): Promise<IUser | null> =>
        this.model.findOneAndUpdate({ email }, { $set: { password } }, { new: true });

    findByRole = (role: string): Promise<IUser[]> =>
        this.model.find({ role });

    updateImageById = (_id: string, image: string): Promise<IUser | null> =>
        this.model.findOneAndUpdate({ _id }, { $set: { image } });

    // updateDocumentsById = (_id: string, documents: string[]): Promise<IUser | null> =>
    //     this.model.findOneAndUpdate({ _id }, { $set: { documents } });

    verifyOwner = (_id: Types.ObjectId, documents: string[]): Promise<IUser | null> =>
        this.model.findOneAndUpdate({ _id }, { $set: { isVerified: true, documents } });

    findUserByToken = (token: string, jwtSecret: string): Promise<IUser | null> => {
        const verify: any = jwt.verify(token, jwtSecret);
        return this.findByEmail(verify.email)
    }

}