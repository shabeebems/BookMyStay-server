import { Model, Types } from "mongoose";
import { IBaseRepository } from "../interfaces/base.interface";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    constructor(protected model: Model<T>) {}

    create = (data: Partial<T>): Promise<T> =>
        this.model.create(data);

    findById = (_id: string): Promise<T | null> =>
        this.model.findById(_id);

    findAll = (): Promise<T[]> =>
        this.model.find();
    
    updateById = (_id: Types.ObjectId | string, data: object): Promise<T | null> =>
        this.model.findOneAndUpdate({ _id }, { $set: { ...data } });

    blockById = (_id: string): Promise<T | null> =>
        this.model.findByIdAndUpdate(
            _id,
            [{ $set: { isBlock: { $not: "$isBlock" } } }],
            { new: true }
        );
}