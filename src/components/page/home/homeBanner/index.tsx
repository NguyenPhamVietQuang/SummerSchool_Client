import { Button, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { imgs } from "@/assets/imgs";
export const HomeBanner: FC = () => {
    const IS_MB = useMediaQuery("(max-width:767px)");
    return (
        <div className={style.homeBanner}>
            <Image
                fetchPriority="high"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
                src={imgs.bannerHome}
                alt="..."
                priority={true}
            />
            <div className={style.banner_contents}>
                <div className={style.banner_content_text}>
                    <h1>
                        Học Lập Trình Frontend{" "}
                        <span className={style.cl_blue}>
                            Thực Chiến Trên Dự Án
                        </span>
                    </h1>
                    <h2>
                        Điều quý giá nhất là sự chân thành, tận tâm, cùng nhau
                        cố gắng để tạo ra những điều tốt đẹp trên hành trình trở
                        thành lập trình viên Frontend
                    </h2>
                </div>
                <div className={style.banner_content_btn}>
                    <Button
                        color={"secondary"}
                        size="large"
                        variant="contained"
                    >
                        <Link href="/danh-sach-khoa-hoc">Xem ngay</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
