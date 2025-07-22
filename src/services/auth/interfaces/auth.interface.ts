import { IUser } from "../../../models/user.model";

export interface ServiceResponse {
    success: boolean;
    message: string;
    email?: string;
}

export interface IAuthService {
    register(data: IUser): Promise<ServiceResponse> 
}
