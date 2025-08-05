import { Types } from "mongoose";
import UserModel, { IUser } from "../models/user.model";
import { BaseRepository } from "./base.repositories";
import jwt from "jsonwebtoken";

export class UserRepository extends BaseRepository<IUser> {

    constructor() {
        super(UserModel);
    }

    findByEmail(email: string): Promise<IUser | null> {
        return this.model.findOne({ email });
    }

    async updatePasswordByEmail(email: string, password: string): Promise<void> {
        await this.model.findOneAndUpdate({ email }, { $set: { password } }, { new: true });
    }

    findByRole(role: string): Promise<IUser[]> {
        return this.model.find({ role });
    }

    async updateImageById(_id: string, image: string): Promise<IUser | null> {
        return await this.model.findOneAndUpdate({ _id }, { $set: { image } });
    }

    async updateDocumentsById(_id: string, documents: string[]): Promise<IUser | null> {
        return await this.model.findOneAndUpdate({ _id }, { $set: { documents } });
    }

    async blockById(_id: string): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(
            _id,
            [{ $set: { isBlock: { $not: "$isBlock" } } }],
            { new: true }
        );
    }

    updateIsVerified(_id: Types.ObjectId, documents: string[]): Promise<IUser | null> {
        return this.model.findOneAndUpdate({ _id }, { $set: { isVerified: true, documents } });
    }

    public findUserByToken = async (token: string, jwtSecret: string): Promise<IUser | null> => {
        const verify: any = jwt.verify(token, jwtSecret);
        return await this.findByEmail(verify.email)
    }

    async updateProfile(_id: Types.ObjectId, data: object): Promise<IUser | null> {
        return await this.model.findOneAndUpdate({ _id }, { $set: { ...data } });
    }
    
}