import { Messages } from "../../../constants/messages";
import { UserRepository } from "../../../repositories/user.repositories";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export class AdminService {
    private userRepository = new UserRepository();

    public async fetchUsers(role: string): Promise<ServiceResponse> {
        const users = await this.userRepository.findByRole(role)
        return { success: true, message: Messages.FETCH_USERS_SUCCESS, data: users };
    }

    public async blockUser(_id: string): Promise<ServiceResponse> {
        await this.userRepository.blockById(_id)
        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }
}
