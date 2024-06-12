export interface IKnown {
    id?: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface IKnownDetail {
    id?: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}