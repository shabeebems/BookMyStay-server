import { Request } from "express";
import { Messages } from "../../../constants/messages";
import { UserRepository } from "../../../repositories/user.repositories";
import CloudinaryV2 from "../../../utils/claudinary";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { decodeToken } from "../../../utils/jwt";

export class OwnerService {
    private userRepository = new UserRepository();

    public async verifyDocuments(documents: string[], req: Request): Promise<ServiceResponse> {
        let uploadedImages: string[] = [];

        for (let base64Image of documents) {
            const result = await CloudinaryV2.uploader.upload(base64Image, {
                folder: `BookMyStay/documents/user`,
            });
            uploadedImages.push(result.secure_url);  // Push uploaded image URL
        }
        console.log(uploadedImages)
        
        const decodeUser = await decodeToken(req)
        const user = await this.userRepository.updateDocumentsById(decodeUser._id, uploadedImages)

        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }
}
