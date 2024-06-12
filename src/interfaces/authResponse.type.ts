export interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    dateOfBirth: string | null;
}

export interface AuthResponse {
    jwt: string;
    user: User;
}
