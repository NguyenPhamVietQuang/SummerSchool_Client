import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { Card } from "@/components/card";
import { useGetObjectUser, usePostMedia } from "@/hooks";
import { IUser } from "@/interfaces/index.type";
import { IReqProfile } from "@/interfaces/req.type";
import { ProfileLayout } from "@/layouts";
import { profileApi } from "@/services/profile.api";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import style from "./style.module.css";

interface FormData {
    fullName: string;
    // username: string;
    email: string;
    dateOfBirth: string;
    objectUser: number;
}

const EditProfile: NextPageWithLayout = () => {
    const [profile, isLoading] = useProfileStore((state: IProfileState) => [
        state.profile,
        state.isLoading,
    ]);
    return (
        <>
            <Seo title="Thông tin tài khoản" description="" url="" />
            {!isLoading && (
                <div className={style.account_page_body}>
                    <Card title={"Thông tin tài khoản"}>
                        <div className={style.edit_profile_body}>
                            {profile && <FormProfile profile={profile} />}
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};
export default EditProfile;

const FormProfile: FC<{ profile: IUser }> = ({ profile }) => {
    const { dataObjectUser } = useGetObjectUser();
    const [updateProfileForm] = useProfileStore((state) => [
        state.updateProfileForm,
    ]);
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Họ và tên không được bỏ trống"),
        // username: Yup.string().required("Username không được bỏ trống"),
        email: Yup.string()
            .email("Sai định dạng example@gmail.com")
            .required("Email không được để trống"),
        dateOfBirth: Yup.string().required("Ngày tháng năm sinh không được bỏ trống"),
        objectUser: Yup.number().required("Nghành nghề không được bỏ trống"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            // username: profile.attributes.username,
            fullName:
                profile.attributes.fullName ?? profile.attributes.username,
            email: profile?.attributes?.email ?? "",
            dateOfBirth: profile.attributes.dateOfBirth
                ? dayjs(profile.attributes.dateOfBirth).format("YYYY-MM-DD")
                : "YYYY-MM-DD",
            objectUser: profile?.attributes?.object_user?.id || 1,
        },
    });
    const onSubmit = (values: FormData) => {
        updateProfileForm({
            fullName: values.fullName,
            // username: values.username,
            email: values.email,
            dateOfBirth: dayjs(values.dateOfBirth).isValid()
                ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
                : undefined,
            objectUserId: values.objectUser,
        });
    };
    return (
        <>
            <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className={style.form_input}
            >
                <div className={style.rowInput}>
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                inputProps={{
                                    style: { textTransform: "capitalize" },
                                }}
                                id="fullName"
                                label="Họ và tên"
                                variant="outlined"
                                fullWidth
                                error={!!errors.fullName}
                                helperText={errors?.fullName?.message}
                                size="medium"
                            />
                        )}
                    />
                    {dataObjectUser.length > 0 && (
                        <Controller
                            name="objectUser"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Nghành nghề
                                    </InputLabel>
                                    <Select
                                        {...field}
                                        labelId="demo-simple-select-label"
                                        id="objectUser"
                                        label="Nghành nghề"
                                    >
                                        {dataObjectUser.map((i) => (
                                            <MenuItem key={i.id} value={i.id}>
                                                {i.attributes.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    )}
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
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                size="medium"
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
                                type="date"
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth?.message}
                                size="medium"
                            />
                        )}
                    />
                </div>
                <div className={style.button}>
                    <Button type="submit" variant="contained" color="secondary">
                        Lưu thông tin
                    </Button>
                </div>
            </form>
        </>
    );
};

EditProfile.Layout = ProfileLayout;
