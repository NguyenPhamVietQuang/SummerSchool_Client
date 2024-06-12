import { axiosConfig } from "@/configs";

export interface ILogin {
    identifier: string;
    password: string;
}

export interface IRegister {
    fullname: string;
    telephone: string;
    email: string;
    password: string;
    dateOfBirth: string;
}

export interface IForgot {
    dateOfBirth?: string;
    email?: string;
    password?: string;
    rePassword?: string;
    token?: string | undefined;
}

export const authApi = {
    login: (body: ILogin) => {
        return axiosConfig.post("/auth/local", body).then((res) => res.data);
    },
    register: (body: IRegister) => {
        return axiosConfig.post("/user-register", body).then((res) => res.data);
    },
    forgot: (body: IForgot) => {
        return axiosConfig.post("auth/forgot", body).then((res) => res.data);
    },
    // logout: () => {
    //     return axiosConfig.post("auth/logout").then((res) => res.data);
    // },
};
