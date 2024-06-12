import { IImage } from "@/interfaces/course.type";

export interface IBlog {
    id: number;
    attributes: Attributes;
}
interface Attributes {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    thumbnail: IImage;
}
