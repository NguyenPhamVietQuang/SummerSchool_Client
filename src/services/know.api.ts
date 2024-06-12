import { axiosConfig } from "@/configs";
import { IKnown, IResponseList } from "@/interfaces/index.type";

export const knowApi = {
    getKnow: () => {
        return axiosConfig
            .get("/knowledges")
            .then<IResponseList<IKnown[]>>((res) => res.data);
    },
};
