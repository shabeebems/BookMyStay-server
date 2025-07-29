import UserModel, { IUser } from "../models/user.model";
import { BaseRepository } from "./base.repositories";

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

    async blockById(_id: string): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(
            _id,
            [{ $set: { isBlocked: { $not: "$isBlocked" } } }],
            { new: true }
        );
    }


}