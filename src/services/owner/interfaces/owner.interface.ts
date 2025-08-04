import { Request, Response } from "express";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export interface IOwnerService {
    uploadOwnerDocuments(documents: string[], req: Request): Promise<ServiceResponse>;
}
