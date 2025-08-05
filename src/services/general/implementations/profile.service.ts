import { Request } from "express";
import { decodeToken } from "../../../utils/jwt";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import CloudinaryV2 from "../../../utils/claudinary";
import { UserRepository } from "../../../repositories/user.repositories";
import bcrypt from "bcrypt";
import { IProfileService } from "../interfaces/profile.interface";

export class ProfileService implements IProfileService {
    private userRepository = new UserRepository();

    public async getProfile(req: Request): Promise<ServiceResponse> {
        const decodeUser = await decodeToken(req)
        const user = await this.userRepository.findById(decodeUser?._id)
        return { success: true, message: "Profile fetch success", data: user };
    }

    public async updateProfile(req: Request): Promise<ServiceResponse> {
        const decodeUser = await decodeToken(req)
        await this.userRepository.updateProfile(decodeUser?._id, req.body)
        // console.log(decodeUser._id)
        return { success: true, message: "Profile fetch success" };
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

    public async changePassword(req: Request): Promise<ServiceResponse> {
        const { oldPassword, newPassword } = req.body
        
        const decodeUser = await decodeToken(req)
        const user = await this.userRepository.findById(decodeUser?._id)

        if(oldPassword.length && user) {
            const checkPassword = (await bcrypt.compare(oldPassword, user.password))
            if(!checkPassword) return { success: false, message: "incorrect old password" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepository.updatePasswordByEmail(decodeUser?.email, hashedPassword)

        return { success: true, message: "password update success", data: user };
    }
}
