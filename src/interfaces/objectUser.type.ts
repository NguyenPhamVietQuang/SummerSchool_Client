export interface IObjectUserApi {
    id: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        uid: string | number | null;
    };
}
