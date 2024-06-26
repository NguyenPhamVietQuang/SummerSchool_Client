import { LayoutProps } from "@/common";
import { ButtonUpload, InitLoaderPage } from "@/components";
import { QR_KEY } from "@/constants";
import { usePostMedia } from "@/hooks";
import { useLogout } from "@/hooks/useLogout";
import { IReqProfile, IUser } from "@/interfaces/index.type";
import { AuthLayout } from "@/layouts";
import { profileApi } from "@/services";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { Container, useMediaQuery } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef } from "react";
import { BiHistory, BiLogOut, BiSolidUser } from "react-icons/bi";
import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos
} from "react-icons/md";
import { toast } from "react-toastify";
import style from "./style.module.css";

const tabItem = [
    {
        id: 1,
        title: "Thông tin tài khoản",
        href: "/profile/edit-profile",
        img: <BiSolidUser style={{ color: "var(--primary)" }} size={20} />,
    },
    {
        id: 2,
        title: "Khóa học đã đăng ký",
        href: "/profile/history",
        img: <BiHistory style={{ color: "var(--primary)" }} size={20} />,
    },
    // {
    //   id: 5,
    //   title: "Thông tin đơn hàng",
    //   href: "/profile/order",
    //   img: <RiInformationFill style={{ color: "var(--primary)" }} size={20} />,
    // },
];
export function ProfileLayout({ children }: LayoutProps) {
    const router = useRouter();
    const { handlePostMedia } = usePostMedia();
    const patchName = router.pathname
        .split("/")
        .filter((item) => Boolean(item));
    const IS_MB = useMediaQuery("(max-width:767px)");
    const [profile, putProfileApi, updateProfileAvatar] = useProfileStore((state: IProfileState) => [
        state.profile,
        state.putProfileApi,
        state.updateProfileAvatar
    ]);
    const refLeft = useRef<HTMLDivElement>(null);
    const refRight = useRef<HTMLDivElement>(null);
    const onLogout = useLogout();
    
    const onChangeMedia = async (e: ChangeEvent<HTMLInputElement>) => {
        InitLoaderPage.onLoading()
        handlePostMedia({
            e,
            callBack: (data) => {
                if(data.length > 0){
                    updateProfileAvatar({
                        media_id:data[0].mediaId,
                        url:data[0].original_url
                    })
                }
                // handleUpdateProfile({ media_id: data[0].mediaId });
                // putProfileApi({media_id: data[0].mediaId });
            },
        });
    };

    const handleStep2 = () => {
        refLeft?.current?.classList.add(style.profile_hidden_left);
        refRight?.current?.classList.add(style.profile_block);
    };
    const handleBackStep1 = () => {
        refRight?.current?.classList.remove(style.profile_block);
        refLeft?.current?.classList.remove(style.profile_hidden_left);
        router.push("/profile");
    };

    useEffect(() => {
        if (patchName && patchName.length > 1) {
            handleStep2();
        }
    }, [patchName]);

    return (
        <AuthLayout>
            <div className={style.profile_page}>
                <Container>
                    <div className={style.profile}>
                        <div ref={refLeft} className={style.profile_left}>
                            {IS_MB && (
                                <Link href={"/"} className={style.btnGoback}>
                                    <MdOutlineArrowBackIosNew size={20} />
                                    <p>Trang chủ</p>
                                </Link>
                            )}
                            <div className={style.profile_wrap}>
                                <div className={style.profile_left_head}>
                                    <div className={style.profile_head_wrap}>
                                        <form action="#">
                                            <ButtonUpload
                                                onChange={onChangeMedia}
                                                profile={profile}
                                            />
                                        </form>
                                        <div className={style.form_name_box}>
                                            <p>
                                                {profile?.attributes?.fullName ?? profile?.attributes?.username}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.profile_left_tablist}>
                                    {tabItem.map((item, index: number) => (
                                        <Link
                                            onClick={handleStep2}
                                            key={index}
                                            href={item.href}
                                        >
                                            <div
                                                className={`${
                                                    style.profile_left_tabItem
                                                } ${
                                                    router.pathname ===
                                                        item.href &&
                                                    style.active_tab
                                                }`}
                                            >
                                                <div
                                                    className={
                                                        style.tabItem_title
                                                    }
                                                >
                                                    {item.img && item.img}
                                                    <span>{item.title}</span>
                                                </div>
                                                <MdOutlineArrowForwardIos
                                                    style={{
                                                        color: "var(--primary)",
                                                    }}
                                                    size={14}
                                                />
                                            </div>
                                        </Link>
                                    ))}

                                    <div
                                        onClick={onLogout}
                                        className={style.profile_left_tabItem}
                                    >
                                        <div className={style.tabItem_title}>
                                            <BiLogOut
                                                style={{
                                                    color: "var(--primary)",
                                                }}
                                                size={20}
                                            />
                                            <span>Đăng xuất</span>
                                        </div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ref={refRight} className={style.profile_right}>
                            {IS_MB && (
                                <div
                                    onClick={handleBackStep1}
                                    className={style.btnGoback}
                                >
                                    <MdOutlineArrowBackIosNew size={20} />
                                    <p>Quay lại</p>
                                </div>
                            )}
                            {children}
                        </div>
                    </div>
                </Container>
            </div>
        </AuthLayout>
    );
}
