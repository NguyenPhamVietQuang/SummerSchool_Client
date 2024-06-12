import { axiosConfig } from "@/configs";
import { ICourse, IResponseList } from "@/interfaces/index.type";
import { IOrderCourse } from "@/interfaces/orderCourse.type";

export const courseApi = {
    getCourse: (param: any) => {
        return axiosConfig
            .get("/courses", param)
            .then<IResponseList<ICourse[]>>((res) => res.data);
    },
    getCourseById: (id: number | string, param: any) => {
        return axiosConfig
            .get(`/courses/${id}`, param)
            .then<IResponseList<ICourse>>((res) => res.data);
    },
    postOrderCourse: (body: any) => {
        return axiosConfig
            .post(`/user-course-order`, body)
            .then<IResponseList<IOrderCourse>>((res) => res.data);
    },
    getCourseOrder: (param: any) => {
        return axiosConfig
            .get("/user-course-order", param)
            .then<IResponseList<IOrderCourse[]>>((res) => res.data);
    },
};
