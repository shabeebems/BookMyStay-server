import { Model } from "mongoose";

export class BaseRepository<T> {
    constructor(protected model: Model<T>) {}

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findById(_id: string): Promise<T | null> {
        return this.model.findById(_id);
    }

    async findAllByUserId(userId: string): Promise<T[]> {
        return this.model.find({ userId });
    }

    async findAll(): Promise<T[]> {
        return this.model.find();
    }

    async statusChange(_id: string, requestStatus: string, rejectReason?: string): Promise<T | null> {
        const updateData: any = { requestStatus };

        if (requestStatus === 'rejected' && rejectReason) {
            updateData.rejectReason = rejectReason;
        } else {
            // Optional: Remove previous rejectReason if status is changed to accepted
            updateData.rejectReason = undefined;
        }

        return this.model.findByIdAndUpdate(_id, updateData, { new: true });
    }

}