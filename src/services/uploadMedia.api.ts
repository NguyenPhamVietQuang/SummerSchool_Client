import { axiosConfig } from "@/configs";
import { IResponseList } from "@/interfaces/index.type";
import { IMedia } from "@/interfaces/media.type";

export const uploadMediaApi = {
    uploadMedia: (file: FormData) => {
        return axiosConfig
            .post("/upload", file, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then<IMedia[]>((res) => res.data);
    },
};
