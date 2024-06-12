import { IAvatar } from "@/interfaces/avatar.type";
interface Teacher {
    id: number;
    name: string;
    sex: boolean;
    telephone: number;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar: IAvatar;
}

interface Course {
    id: number;
    name: string;
    title: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    content: string | null;
    startDate: string;
    numberOfSessions: string;
    image: IAvatar;
    teacher: Teacher;
    endDate: string | null
}

export interface IOrderCourse {
    createdAt: string;
    id: number;
    note: string;
    updatedAt: string;
    publishedAt: string | null;
    courses?: Course[];
}
