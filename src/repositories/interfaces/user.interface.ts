import { Types } from "mongoose";
import { IUser } from "../../models/user.model";
import { IBaseRepository } from "./base.interface";

export interface IUserRepository extends IBaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    updatePasswordByEmail(email: string, password: string): Promise<IUser | null>;
    findByRole(role: string): Promise<IUser[]>;
    updateImageById(_id: string, image: string): Promise<IUser | null>;
    verifyOwner(_id: Types.ObjectId, documents: string[]): Promise<IUser | null>;
    findUserByToken(token: string, jwtSecret: string): Promise<IUser | null>;
    blockById(_id: string): Promise<IUser | null>;
}
