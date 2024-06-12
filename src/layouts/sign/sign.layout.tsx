import { LayoutProps } from "@/common";
import { Seo } from "@/components";
import Footer from "@/components/footer";
import { Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./style.module.css";

interface ISignLayoutProps extends LayoutProps {
    isForgot?: boolean;
}

export const SignLayout = ({ children }: ISignLayoutProps) => {
    const router = useRouter();
    const patchName = router.pathname;
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        switch (patchName) {
            case "/auth/login":
                setTitle("Đăng nhập");
                break;
            case "/auth/register":
                setTitle("Đăng ký");
                break;
            case "/auth/verify":
                setTitle("Xác minh email");
                break;
            case "/auth/forgot":
                setTitle("Lấy lại mật khẩu");
                break;
            default:
                break;
        }
    }, [patchName]);

    return (
        <>
            <Seo title={title} description={title} url={router.pathname} />

            {/* header */}
            <div className={style.signHeader}>
                <div className={style.signHeaderWrap}>
                    <div className={style.signLogoWrap}>
                        <Link href="/" className={style.logo}>
                            {/* <Image
                                src={imgs.logoBlack}
                                width={IS_MB ? 30 : 40}
                                height={IS_MB ? 30 : 40}
                                alt="Logo"
                            /> */}
                            LOGO
                        </Link>
                    </div>
                    <div className={style.signTitle}>{title}</div>
                </div>
            </div>
            {/* close header */}

            <Container>{children}</Container>

            <Footer />
        </>
    );
};
