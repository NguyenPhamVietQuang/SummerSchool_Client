import { IAvatar } from "@/interfaces/index.type";

export interface ICourse {
    id: number;
    attributes: {
        name: string;
        title: string;
        active: boolean;
        createdAt: string;
        updatedAt: string;
        numberOfSessions: number | null;
        startDate: string | null;
        publishedAt: string;
        content: string | null;
        image: IImage;
        teacher: ITeacher;
        endDate: string | null
    };
}
export interface ICourseDetail {
    id?: string | number;
    name: string;
    title: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    numberOfSessions: number | null;
    startDate: string | null;
    publishedAt: string;
    content: string | null;
    image: IImage;
    teacher: ITeacher;
    endDate: string | null
}

export interface IImage {
    data: {
        id: number;
        attributes: Omit<IAvatar, "id">;
    };
}

export interface ITeacher {
    data: {
        id: number;
        attributes: {
            name: string;
            sex: boolean;
            telephone: number;
            dateOfBirth: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            avatar: {
                data: {
                    id: number;
                    attributes: Omit<IAvatar, "id">;
                };
            };
        };
    };
}