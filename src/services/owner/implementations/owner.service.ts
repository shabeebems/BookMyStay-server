import { Request } from "express";
import { Messages } from "../../../constants/messages";
import CloudinaryV2 from "../../../utils/claudinary";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { clearRefreshToken, decodeToken } from "../../../utils/jwt";
import { UserRepository } from "../../../repositories/user.repositories";
import { NotificationRepository } from "../../../repositories/notification.repositories";

export class OwnerService {
    private userRepository = new UserRepository();
    private notificationRepository = new NotificationRepository();

    public async verifyDocuments(documents: string[], req: Request): Promise<ServiceResponse> {
        let uploadedImages: string[] = [];

        for (let base64Image of documents) {
            const result = await CloudinaryV2.uploader.upload(base64Image, {
                folder: `BookMyStay/documents/user`,
            });
            uploadedImages.push(result.secure_url);  // Push uploaded image URL
        }
        const decodeUser = await decodeToken(req)
        const newNotification = {
            userId: decodeUser._id,
            title: "Request for Registration",
            message: "New owner has submitted verification documents.",
            documents: uploadedImages,
            ownerId: decodeUser._id
        }
        const notification = await this.notificationRepository.create(newNotification)

        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }

    public async checkIsVerified(req: Request, res: any): Promise<ServiceResponse> {
        const decodeUser = await decodeToken(req)
        const user = await this.userRepository.findById(decodeUser._id)
        if(user?.isVerified) {
            clearRefreshToken(res)
            return { success: true, message: Messages.FETCH_USERS_SUCCESS };
        }
        return { success: false, message: Messages.FETCH_USERS_SUCCESS };
    }
}
