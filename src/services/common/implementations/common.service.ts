import { Request } from "express";
// import { UserRepository } from "../../../repositories/user.repositories";
import { decodeToken } from "../../../utils/jwt";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import CloudinaryV2 from "../../../utils/claudinary";
import { UserRepository } from "../../../repositories/user.repositories";
import { NotificationRepository } from "../../../repositories/notification.repositories";

export class CommonService {
    private userRepository = new UserRepository();
    private notificationRepository = new NotificationRepository();

    public async getProfile(req: Request): Promise<ServiceResponse> {
        const decodeUser = await decodeToken(req)
        const user = await this.userRepository.findById(decodeUser?._id)
        return { success: true, message: "Profile fetch success", data: user };
    }

    public async updateImage(data: { image: string, userId: string }): Promise<ServiceResponse> {
        try {
            const { image, userId } = data
            // Upload image to cloudinary
            let result = await CloudinaryV2.uploader.upload(image, {
                folder: "BookMyStay/user",
            });
            
            const user = await this.userRepository.updateImageById(userId, result.url)
            if(!user) return { success: true, message: "Profile fetch success" }
            return { success: true, message: "Profile fetch success", data: { image: result.url } };
        } catch (error) {
            console.log(error)
            return { success: true, message: "Profile fetch success" };
            
        }
    }

    public async getNotifications(req: Request): Promise<ServiceResponse> {
        const decodeUser = await decodeToken(req)
        const notification = await this.notificationRepository.findAllByUserId(decodeUser?._id)
        return { success: true, message: "Profile fetch success", data: notification };
    }
}
