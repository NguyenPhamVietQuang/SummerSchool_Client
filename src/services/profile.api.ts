import { axiosConfig } from "@/configs";
import { IReqProfile } from "@/interfaces/index.type";

export const profileApi = {
    getProfile: () => {
        return axiosConfig.get("/user-profile").then((res) => res.data);
    },
    putProfile: (body: IReqProfile) => {
        return axiosConfig.post("/user-profile", body).then((res) => res.data);
    },
};
