import UserModel, { IUser } from "../models/user.model";
import { BaseRepository } from "./base.repositories";

export class UserRepository extends BaseRepository<IUser> {

    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email });
    }
}