import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronDown } from "react-icons/fa";
import { Avatar, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { courseApi } from "@/services";
import { ICourse } from "@/interfaces/course.type";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { useLogout } from "@/hooks";
import { generateImageUrl } from "@/utils";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const [profile] = useProfileStore((state: IProfileState) => [
        state.profile,
    ]);
    const IS_MB = useMediaQuery("(max-width:1023px)");

    function handleActiveHambuger() {
        document.body.classList.toggle(style.body_active);
    }
    function handleRemoveHambuger() {
        document.body.classList.remove(style.body_active);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 66) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        setIsHomePage(
            window.location.pathname === "/" ||
            window.location.pathname.split("/")[1] === "khoa-hoc"
        );

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`${style.header} ${style.container_fluid} ${
                isHomePage && isScrolled
                    ? style.scrolled
                    : !isHomePage && style.scrolled
            }`}
        >
            <div className={style.header_left}>
                <div
                    onClick={() => handleActiveHambuger()}
                    className={style.hamburger}
                    id={style.hamburger}
                >
                    <span className={style.line}></span>
                    <span className={style.line}></span>
                    <span className={style.line}></span>
                </div>
                <Link href="/" className={style.header_logo}>
                    LOGO
                </Link>
            </div>
            <HeaderNav handleRemoveHambuger={handleRemoveHambuger} />
            {!profile ? (
                <Link href={"/auth/login"} className={style.header_btn_login}>
                    Đăng nhập
                </Link>
            ) : (
                <Link
                    onClick={() => handleRemoveHambuger()}
                    href={IS_MB ? "/profile" : "/profile/edit-profile"}
                    className={style.header_btn_login}
                >
                    <Avatar
                        alt={
                            profile?.attributes?.fullName ??
                            profile?.attributes?.username
                        }
                        sx={{
                            backgroundColor: "var(--secondary-cl)",
                            width: IS_MB ? 30 : 36,
                            height: IS_MB ? 30 : 36,
                        }}
                        src={generateImageUrl(profile.attributes.avatar?.url)}
                    ></Avatar>
                    <p className={style.header_username}>
                        {profile?.attributes?.fullName ??
                            profile?.attributes?.username}
                    </p>
                </Link>
            )}
        </div>
    );
}

// export const getStaticProps: GetStaticProps<any> = async (
//     context: GetStaticPropsContext
// ) => {
//     let course = [];
//     try {
//         const response = await axios
//             .get(`${baseURL}/course`, {
//                 params: {
//                     populate: "image",
//                 },
//             })
//             .then((res) => res?.data);
//         course = response;
//     } catch (error) {
//         console.log(error);
//     }
//     return {
//         props: { course },
//         revalidate: 3600 * 24,
//     };
// };

interface IProps {
    handleRemoveHambuger: () => void;
}
const HeaderNav = (props: IProps) => {
    const [profile] = useProfileStore((state: IProfileState) => [
        state.profile,
    ]);
    const { handleRemoveHambuger } = props;
    const IS_MB = useMediaQuery("(max-width:1023px)");
    const params: { populate: string } = {
        populate: "teacher, teacher.avatar, image",
    };
    const onLogout = useLogout();
    const handleLogout = () => {
        handleRemoveHambuger();
        onLogout();
    };
    const { data: course } = useQuery({
        queryKey: [QR_KEY.COURSE],
        queryFn: () => courseApi.getCourse({ params }),
        staleTime: QR_TIME_CACHE,
    });
    const dataCourse = course?.data ?? [];
    return (
        <nav className={style.nav}>
            <ul className={style.nav_ul}>
                <li
                    onClick={() => handleRemoveHambuger()}
                    className={style.nav_li}
                >
                    <Link href="/">Trang chủ</Link>
                </li>
                <li
                    onClick={() => handleRemoveHambuger()}
                    className={style.nav_li}
                >
                    <Link href={"/danh-sach-khoa-hoc"}>
                        Khoá học{" "}
                        <FaChevronDown
                            style={IS_MB ? { display: "none" } : {}}
                            size={14}
                        />
                    </Link>
                    <ul className={style.nav_submenu}>
                        {dataCourse?.map((item: ICourse) => (
                            <li key={item?.id}>
                                <Link href={`/khoa-hoc/${item?.id}`}>
                                    {item?.attributes?.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li
                    onClick={() => handleRemoveHambuger()}
                    className={style.nav_li}
                >
                    <Link href="/bai-viet">Bài viết</Link>
                </li>
                {IS_MB && profile && (
                    <li onClick={handleLogout} className={style.nav_li}>
                        <Link href="/">Đăng xuất</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};
