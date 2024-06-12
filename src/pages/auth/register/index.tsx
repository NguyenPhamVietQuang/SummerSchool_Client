import { NextPageWithLayout } from "@/common";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { IKnown, IObjectUserApi } from "@/interfaces/index.type";
import { SignLayout } from "@/layouts";
import { authApi, knowApi } from "@/services";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Container, useMediaQuery } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import style from "../style.module.css";
import { useGetObjectUser } from "@/hooks";

const RegisterPage: NextPageWithLayout = () => {
    const IS_MB = useMediaQuery("(max-width:767px)");
    const router = useRouter();

    const {dataObjectUser} = useGetObjectUser()

    const { data: know } = useQuery({
        queryKey: [QR_KEY.KNOW],
        queryFn: () => knowApi.getKnow(),
        staleTime: QR_TIME_CACHE,
    });
    const dataKnow = know?.data || [];
    // console.log(dataKnow);

    const validationSchema = Yup.object({
        username: Yup.string().required("Vui lòng nhập họ và tên"),
        // telephone: Yup.string()
        //     .required("Vui lòng nhập số điện thoại")
        //     .matches(validate.phoneVn, {
        //         message: "Vui lòng nhập đúng định dạng",
        //     }),
        email: Yup.string()
            .required("Vui lòng nhập email")
            .matches(validate.email, {
                message: "Vui lòng nhập đúng định dạng",
            }),
        dateOfBirth: Yup.string().required("Vui lòng chọn ngày sinh"),
        password: Yup.string().required("Vui lòng nhập mật khẩu"),
        objectUserId: Yup.string()
            .required("Vui lòng chọn đối tượng học")
            .notOneOf(["0"], "Vui lòng chọn chức vụ"),
        knowledge_id: Yup.string()
            .required("Vui lòng chọn đối tượng học")
            .notOneOf(["0"], "Vui lòng chọn trường này"),

        // password: Yup.string()
        //   .required("Password is required")
        //   .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        //   .max(32, "Mật khẩu nhiều nhất 32 ký tự")
        //   .matches(validate.password, {
        //     message:
        //       "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 kí tự",
        //   }),
    });

    type FormData = Yup.InferType<typeof validationSchema>;

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            // telephone: "",
            dateOfBirth: "",
            objectUserId: "0",
            knowledge_id: "0",
        },
    });

    const onSubmit = (data: FormData) => {
        mutate(data);
        // console.log("data :>> ", data);
    };

    const { mutate, status } = useMutation({
        mutationFn: (body: any) => authApi.register(body),
        onSuccess: async () => {
            reset();
            toast.success("Đăng ký thành công");
            setTimeout(() => {
                router.push("/auth/login");
            }, 1000);
        },
        onError: (error) => {
            const err = error as AxiosError<any>;
            // console.log();
            if (
                err?.response?.data?.error?.message ==
                "This attribute must be unique"
            ) {
                toast.error("Email hoặc tên đăng nhập này đã tồn tại!");
            } else {
                toast.error(`${err?.response?.data?.error?.message ?? ""}`);
            }
        },
    });

    return (
        <>
            <Container>
                <div className={style.loginWraper}>
                    <div className={style.loginRight}>
                        <form
                            className={style.loginForm}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <p className={style.loginTitle}>Đăng ký</p>
                            <div className={IS_MB ? undefined : style.formRow}>
                                <div className={style.wrapInput}>
                                    <input
                                        {...register("username", {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Tên đăng nhập"
                                        className={style.input}
                                    />
                                    {errors.username && (
                                        <p className={style.textErr}>
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>

                                <div className={style.wrapInput}>
                                    <input
                                        {...register("email", {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Email"
                                        className={style.input}
                                    />
                                    {errors.email && (
                                        <p className={style.textErr}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={IS_MB ? undefined : style.formRow}>
                                <div className={style.wrapInput}>
                                    <select
                                        {...register("objectUserId", {
                                            required: true,
                                        })}
                                        name="objectUserId"
                                        id="objectUserId"
                                        className={style.input}
                                    >
                                        <option value={0}>
                                            Chọn nghành nghề
                                        </option>
                                        {dataObjectUser?.map(
                                            (
                                                item: IObjectUserApi,
                                                index: number
                                            ) => (
                                                <option
                                                    key={item.id}
                                                    value={item?.id}
                                                >
                                                    {item?.attributes?.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    {errors.objectUserId && (
                                        <p className={style.textErr}>
                                            {errors.objectUserId.message}
                                        </p>
                                    )}
                                </div>
                                <div className={style.wrapInput}>
                                    <input
                                        {...register("dateOfBirth", {
                                            required: true,
                                        })}
                                        className={style.input}
                                        type="date"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                    />
                                    {errors.dateOfBirth && (
                                        <p className={style.textErr}>
                                            {errors.dateOfBirth.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={style.wrapInput}>
                                <select
                                    {...register("knowledge_id", {
                                        required: true,
                                    })}
                                    name="knowledge_id"
                                    id="knowledge_id"
                                    className={style.input}
                                >
                                    <option value={0}>
                                        Bạn biết gì về lớp hè
                                    </option>
                                    {dataKnow?.map((item: IKnown) => (
                                        <option key={item.id} value={item?.id}>
                                            {item?.attributes?.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.knowledge_id && (
                                    <p className={style.textErr}>
                                        {errors.knowledge_id.message}
                                    </p>
                                )}
                            </div>

                            <div className={style.wrapInput}>
                                <input
                                    {...register("password", {
                                        required: true,
                                    })}
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className={style.input}
                                />
                                {errors.password && (
                                    <p className={style.textErr}>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className={style.wrapInput}>
                                <LoadingButton
                                    type="submit"
                                    style={{
                                        backgroundColor: "var(--primary-cl)",
                                        padding: IS_MB
                                            ? "12px 20px"
                                            : "20px 14px",
                                        width: "100%",
                                        borderRadius: "8px",
                                        fontWeight: "bold",
                                        margin: "14px 0",
                                    }}
                                    loading={status == "pending"}
                                    variant="contained"
                                >
                                    Đăng ký
                                </LoadingButton>
                            </div>

                            <div className={style.wrapInput}>
                                <p className={style.formRegisText}>
                                    Bạn đã có có tài khoản?{" "}
                                    <Link href="/auth/login">
                                        Đăng nhập ngay
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};
RegisterPage.Layout = SignLayout;
export default RegisterPage;
