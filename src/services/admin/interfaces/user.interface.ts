import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export interface IUserService {
    fetchUsers(role: string): Promise<ServiceResponse>;
    blockUser(_id: string): Promise<ServiceResponse>;
}
