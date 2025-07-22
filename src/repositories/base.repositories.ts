import { Model } from "mongoose";

export class BaseRepository<T> {
    constructor(protected model: Model<T>) {}

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }
}