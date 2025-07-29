import { Model } from "mongoose";

export class BaseRepository<T> {
    constructor(protected model: Model<T>) {}

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findById(_id: string): Promise<T | null> {
        return this.model.findById(_id);
    }
}