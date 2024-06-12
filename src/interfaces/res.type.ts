import { IPagination } from "@/interfaces/page.type";
import { AxiosResponse } from "axios";

export interface AxiosCusError<D> extends AxiosResponse<D> {
    response: {
        data: D;
    };
}
export interface IResponseDetail<T> {
    attributes: T;
    id: number;
}
export interface IResponseList<T> {
    data: T;
    meta: {
        pagination: IPagination;
    };
}
