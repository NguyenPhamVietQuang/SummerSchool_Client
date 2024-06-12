import { queryClient } from "@/configs";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { ICourse } from "@/interfaces/course.type";
import { IResponseList } from "@/interfaces/res.type";
import { courseApi } from "@/services";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
    Button,
    Container,
    Dialog,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import markdownit from "markdown-it";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import style from "./style.module.css";

export default function CourseInfo() {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const idCourse = router?.query?.courseId as string;
    const [open, setOpen] = useState<boolean>(false);
    const [checkOrder, setCheckOrder] = useState<boolean>(false);
    const [profile] = useProfileStore((state: IProfileState) => [
        state.profile,
    ]);
    const md = markdownit({
        html: true,
        linkify: true,
        typographer: true,
    });
    function handleClose() {
        setOpen(false);
    }

    function handleCheckOrder() {
        setCheckOrder(true);
    }

    const params: { populate: string } = {
        populate: "teacher, teacher.avatar, image",
    };

    const {
        isError,
        data: courseDetail,
        error,
    } = useQuery({
        queryKey: [QR_KEY.COURSE_DETAIL, idCourse],
        enabled: !!idCourse,
        retry: false,
        queryFn: () => courseApi.getCourseById(idCourse, { params }),
        staleTime: QR_TIME_CACHE,
    });

    const { data: courseOrder } = useQuery({
        queryKey: [QR_KEY.COURSE_ORDER],
        queryFn: () => courseApi.getCourseOrder({ params }),
        staleTime: QR_TIME_CACHE,
    });

    useEffect(() => {
        if (courseOrder && courseDetail) {
            const isOrdered = courseOrder?.data.some((item: any) => {
                return item?.courses[0]?.id === courseDetail?.data?.id;
            });
            setCheckOrder(isOrdered);
        }
    }, [courseOrder, courseDetail]);

    if (isError) {
        toast.error(`Có lỗi xảy ra vui lòng thử lại sau (${error})`);
    }

    const imgCourse =
        courseDetail?.data?.attributes?.image?.data?.attributes?.url;
    const currentDate = dayjs();

    const endDate = dayjs(
        courseDetail && courseDetail.data.attributes.endDate,
        "YYYY-MM-DD"
    );
    const isCourseExpired = currentDate.isAfter(endDate);
    const isCourseActive = courseDetail && courseDetail.data.attributes.active;
    const backgroundImageStyle = {
        backgroundImage: `url(${
            imgCourse
                ? `${baseUrl}${imgCourse}`
                : "https://source.unsplash.com/random"
        })`,
    };

    return (
        <div className={style.course_info}>
            <div className={style.course_bgwrap}>
                <div
                    className={style.course_bg}
                    style={backgroundImageStyle}
                ></div>
                <div className={style.course_info_content}>
                    <div className={style.info_banner_content}>
                        <p className={style.info_banner_text}>Khóa học</p>
                        <h1 className={style.info_banner_name}>
                            {courseDetail?.data?.attributes?.name}
                        </h1>
                        <div className={style.info_banner_time}>
                            <div className={style.info_banner_timelecture}>
                                <p className={style.info_banner_text}>
                                    Khai giảng
                                </p>
                                <p>
                                    {dayjs(
                                        courseDetail?.data?.attributes
                                            ?.startDate
                                    ).format("DD-MM-YYYY") ?? 0}
                                </p>
                            </div>
                            <div className={style.info_banner_session}>
                                <p className={style.info_banner_text}>
                                    Thời lượng
                                </p>
                                <p>
                                    {courseDetail?.data?.attributes
                                        ?.numberOfSessions ?? 0}{" "}
                                    Buổi
                                </p>
                            </div>
                        </div>

                        {isCourseExpired || !isCourseActive ? (
                            <Button
                                disabled={isCourseExpired || !isCourseActive}
                                size="large"
                                variant="contained"
                                color="primary"
                            >
                                {isCourseExpired && "Hết hạn đăng ký"}{" "}
                                {!isCourseActive && "Khóa học đang tạm đóng"}
                            </Button>
                        ) : (
                            <Button
                                disabled={checkOrder}
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={
                                    profile
                                        ? () => setOpen(true)
                                        : () => router.push("/auth/login")
                                }
                            >
                                {checkOrder ? "Đã đăng ký" : "Đăng ký ngay"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className={style.course_info_botom}>
                <Container maxWidth="md">
                    <p className={style.course_info_title}>Mô tả khóa học</p>
                    <div
                        className={style.course_info_desc}
                        dangerouslySetInnerHTML={{
                            __html:
                                md.render(
                                    `${
                                        courseDetail?.data?.attributes
                                            ?.content ?? "<p>Đang cập nhật</p>"
                                    }`
                                ) || "",
                        }}
                    />
                </Container>
            </div>
            {courseDetail && (
                <DialogCourse
                    setCheckOrder={handleCheckOrder}
                    courseDetail={courseDetail}
                    open={open}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
}

interface IProps {
    open: boolean;
    handleClose: () => void;
    setCheckOrder: () => void;
    courseDetail: IResponseList<ICourse>;
}

export const DialogCourse = (props: IProps) => {
    const { open, handleClose, courseDetail, setCheckOrder } = props;
    type FormData = Yup.InferType<typeof validationSchema>;
    const validationSchema = Yup.object().shape({
        note: Yup.string().required("Hãy để lại mong muốn của mình nhé!"),
        name: Yup.string(),
        email: Yup.string(),
        dateOfBirth: Yup.string(),
        objectUser: Yup.string(),
    });
    const [profile] = useProfileStore((state: IProfileState) => [
        state.profile,
    ]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            note: "",
            name: profile?.attributes?.username ?? "",
            email: profile?.attributes?.email ?? "",
            dateOfBirth:
                dayjs(profile?.attributes?.dateOfBirth).format("DD-MM-YYYY") ??
                "",
            objectUser: profile?.attributes?.object_user?.name ?? "",
        },
    });

    const onSubmit = (data: FormData) => {
        const newData = {
            ...data,
            course_ids: [courseDetail?.data?.id],
        };
        mutate(newData);
    };
    const { mutate, status } = useMutation({
        mutationFn: (body: any) => courseApi.postOrderCourse(body),
        onSuccess: async () => {
            reset();
            toast.success("Đăng ký thành công");
            handleClose();
            queryClient.invalidateQueries({
                queryKey: [QR_KEY.COURSE_DETAIL, QR_KEY.COURSE_ORDER],
            });
        },
        onError: (error: any) => {
            const err = error as AxiosError<any>;
            console.log(err);
            toast.error(`${err ?? ""}`);
        },
    });
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Đăng ký khóa học"}
            </DialogTitle>
            <div className={style.dialogCourse}>
                <form
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                    className={style.form_input}
                >
                    <div className={style.rowInput}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="name"
                                    label="Họ và tên"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    disabled
                                />
                            )}
                        />
                        <Controller
                            name="objectUser"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="objectUser"
                                    label="Nghành nghề"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    disabled
                                />
                            )}
                        />
                    </div>
                    <div className={style.rowInput}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    disabled
                                />
                            )}
                        />
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="dateOfBirth"
                                    label="Ngày tháng năm sinh"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    disabled
                                />
                            )}
                        />
                    </div>
                    <p className={style.know_test}>
                        Bạn mong muốn thu hoạch được gì sau lớp học hè?
                    </p>
                    <div className={style.rowInput}>
                        <Controller
                            name="note"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="note"
                                    label="Aa"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.note}
                                    helperText={errors.note?.message}
                                    size="medium"
                                />
                            )}
                        />
                    </div>
                    <div className={style.btn_dialog_submit}>
                        <LoadingButton
                            type="submit"
                            loading={status == "pending"}
                            variant="contained"
                            onClick={setCheckOrder}
                        >
                            Đăng ký
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};
