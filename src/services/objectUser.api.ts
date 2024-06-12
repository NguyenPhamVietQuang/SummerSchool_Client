import { axiosConfig } from "@/configs";
import { IObjectUserApi, IResponseList } from "@/interfaces/index.type";

export const objectUserApi = {
    getObjectUser: () => {
        return axiosConfig
            .get("/object-users")
            .then<IResponseList<IObjectUserApi[]>>((res) => res.data);
    },
};
