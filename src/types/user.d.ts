import { Types } from "mongoose";

interface IUserReturn {
    _id: Types.ObjectId;
    name: string;
    email: string;
    mobile: string;
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    mobile: string;
}