import { Request } from "express";
import { Messages } from "../../../constants/messages";
import CloudinaryV2 from "../../../utils/claudinary";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { decodeToken } from "../../../utils/jwt";
import { IOwnerService } from "../interfaces/owner.interface";
import { UserRepository } from "../../../repositories/implementations/user.repositories";
import { NotificationRepository } from "../../../repositories/implementations/notification.repositories";
import { HotelRepository } from "../../../repositories/implementations/hotel.repositories";
import { RoomRepository } from "../../../repositories/implementations/room.repositories";

export class OwnerService implements IOwnerService {
    private notificationRepository = new NotificationRepository();
    private userRepository = new UserRepository();
    private hotelRepository = new HotelRepository();
    private roomRepository = new RoomRepository();

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

    public async fetchHotels(req: Request): Promise<ServiceResponse> {
        const decodeUser = await decodeToken(req)
        const hotels =  await this.hotelRepository.findByOwnerId(decodeUser._id)
        
        return { success: true, message: Messages.FETCH_USERS_SUCCESS, data: hotels };
    }

    public async addHotel(req: Request): Promise<ServiceResponse> {
        try {
            
            const { documents, images, name, facilities, description } = req.body
            
            let uploadedDocuments: string[] = [];
            
            for (let base64Image of documents) {
                const result = await CloudinaryV2.uploader.upload(base64Image, {
                    folder: `BookMyStay/documents/hotel`,
                });
                uploadedDocuments.push(result.secure_url);  // Push uploaded image URL
            }
            
            let uploadedImages: string[] = [];
            
            for (let base64Image of images) {
                const result = await CloudinaryV2.uploader.upload(base64Image, {
                    folder: `BookMyStay/hotel`,
                });
                uploadedImages.push(result.secure_url);  // Push uploaded image URL
            }
            
            const decodeUser = await decodeToken(req)
            
            const newHotel = {
                ownerId: decodeUser._id,
                name, facilities, description,
                images: uploadedImages,
                documents: uploadedDocuments
            };
            
            await this.hotelRepository.create(newHotel)
            
            return { success: true, message: Messages.FETCH_USERS_SUCCESS };
        } catch (error) {
            console.log(error)
            return { success: false, message: Messages.FETCH_USERS_SUCCESS };
            
        }
    }

    public async updateHotel(req: Request): Promise<ServiceResponse> {
        try {
            const { images, name, facilities, description } = req.body
            
            let uploadedImages: string[] = [];
            
            for (let base64Image of images) {
                const result = await CloudinaryV2.uploader.upload(base64Image, {
                    folder: `BookMyStay/hotel`,
                });
                uploadedImages.push(result.secure_url);  // Push uploaded image URL
            }
            
            const updatingHotel = {
                name, facilities, description,
                images: uploadedImages,
            };
            
            await this.hotelRepository.updateById(req.params.hotelId, updatingHotel)
            
            return { success: true, message: Messages.FETCH_USERS_SUCCESS };
        } catch (error) {
            console.log(error)
            return { success: false, message: Messages.FETCH_USERS_SUCCESS };
            
        }
    }
    
    public async blockHotel(req: Request): Promise<ServiceResponse> {
        await this.hotelRepository.blockById(req.params.hotelId)
        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }

    public async addRoom(req: Request): Promise<ServiceResponse> {
        const { 
            roomName, roomNumber, sleeps, facilities, description, images, hotelId, rates
        } = req.body
        let uploadedImages: string[] = [];
        
        for (let base64Image of images) {
            const result = await CloudinaryV2.uploader.upload(base64Image, {
                folder: `BookMyStay/hotel`,
            });
            uploadedImages.push(result.secure_url);  // Push uploaded image URL
        }
        
        const newRoom = {
            roomName, roomNumber, sleeps, facilities, description, hotelId, rates,
            images: uploadedImages
        };
        
        await this.roomRepository.create(newRoom)
        
        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }

    public async fetchRooms(req: Request): Promise<ServiceResponse> {
        const rooms = await this.roomRepository.findByHotelId(req.params.hotelId)
        return { success: true, message: Messages.FETCH_USERS_SUCCESS, data: rooms };
    }
}