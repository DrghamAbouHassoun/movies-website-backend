import { Types } from "mongoose";

interface IUserReturn {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    phone: string;
}