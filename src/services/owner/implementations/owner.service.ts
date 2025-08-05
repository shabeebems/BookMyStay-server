import { Request } from "express";
import { Messages } from "../../../constants/messages";
import CloudinaryV2 from "../../../utils/claudinary";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { decodeToken } from "../../../utils/jwt";
import { NotificationRepository } from "../../../repositories/notification.repositories";
import { IOwnerService } from "../interfaces/owner.interface";
import { UserRepository } from "../../../repositories/user.repositories";

export class OwnerService implements IOwnerService {
    private notificationRepository = new NotificationRepository();
    private userRepository = new UserRepository();

    public async uploadOwnerDocuments(documents: string[], req: Request): Promise<ServiceResponse> {
        let uploadedImages: string[] = [];

        for (let base64Image of documents) {
            const result = await CloudinaryV2.uploader.upload(base64Image, {
                folder: `BookMyStay/documents/user`,
            });
            uploadedImages.push(result.secure_url);  // Push uploaded image URL
        }
        const decodeUser = await decodeToken(req)

        const user = await this.userRepository.findById(decodeUser._id)
        if(!user) return { success: false, message: Messages.FETCH_USERS_SUCCESS };
        
        const newNotification = {
            userId: decodeUser._id,
            title: "New Owner Verification Request",
            message: `Owner "${user.name}" has submitted documents for verification.`,
            documents: uploadedImages,
            ownerId: decodeUser._id
        };

        await this.notificationRepository.create(newNotification)

        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }
}
