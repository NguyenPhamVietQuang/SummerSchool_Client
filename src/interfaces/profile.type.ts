import { IAvatar } from "@/interfaces/avatar.type";
import { IKnownDetail, IOrderCourse } from "@/interfaces/index.type";

export interface ObjectUser {
    id?: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    uid: string | null;
}

export interface IUserAttributes {
    id?: number;
    username: string;
    email: string;
    provider: string;
    resetPasswordToken: string | null;
    confirmationToken: string | null;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    dateOfBirth: string;
    fullName?: string;
    role?: string | null;
    object_user?: ObjectUser;
    course_orders?: IOrderCourse[];
    knowledge?: IKnownDetail;
    avatar?: IAvatar;
    createdBy: null | string;
    updatedBy: null | string;
}

export interface IUser {
    id: number;
    attributes: IUserAttributes;
}

// interface MetaData {}

// interface ResponseData {
//     data: UserData;
//     meta: MetaData;
// }
