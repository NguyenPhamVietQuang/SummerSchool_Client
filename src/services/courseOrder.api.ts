import { axiosConfig } from "@/configs";
import { IResponseList } from "@/interfaces/index.type";
import { IOrderCourse } from "@/interfaces/orderCourse.type";

export const courseOrderApi = {
    getKnow: (param: any) => {
        return axiosConfig
            .get("/user-course-order", param)
            .then<IResponseList<IOrderCourse[]>>((res) => res.data);
    },
};
