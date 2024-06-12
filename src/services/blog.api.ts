import { axiosConfig } from "@/configs";
import { IBlog, IResponseList } from "@/interfaces/index.type";

export const blogApi = {
    getBlog: (params: any) => {
        return axiosConfig
            .get("/blogs", params)
            .then<IResponseList<IBlog[]>>((res) => res.data);
    },
    getBlogById: (id: number | string, params: any) => {
        return axiosConfig
            .get(`/blogs/${id}`, params)
            .then<IResponseList<IBlog>>((res) => res.data);
    },
};
