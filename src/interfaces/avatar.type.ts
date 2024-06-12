import { ImageFormat } from "@/interfaces/index.type";

export interface IImageFormats {
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
    thumbnail?: ImageFormat;
}
export interface IAvatar {
    id?: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: IImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
}
