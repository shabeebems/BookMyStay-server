import { Request } from "express";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export interface IProfileService {
    getProfile(req: Request): Promise<ServiceResponse>;
    updateImage(data: { image: string; userId: string }): Promise<ServiceResponse>;
    changePassword(req: Request): Promise<ServiceResponse>;
}
