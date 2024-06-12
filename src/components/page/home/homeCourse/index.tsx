import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { Avatar, Button, Fab, useMediaQuery } from "@mui/material";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { courseApi } from "@/services";
import { ICourse } from "@/interfaces/course.type";
import Link from "next/link";
import dayjs from "dayjs";
import CourseItem from "@/components/courseItem";
export default function HomeCourse() {
    const IS_MB = useMediaQuery("(max-width:1023px)");
    const slider = React.useRef<any>(null);
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const settings: any = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: IS_MB && <NextArrow slider={slider} />,
        prevArrow: IS_MB && <PrevArrow slider={slider} />,
    };

    const params: { populate: string } = {
        populate: "teacher, teacher.avatar, image",
    };
    const { data: course } = useQuery({
        queryKey: [QR_KEY.COURSE],
        queryFn: () => courseApi.getCourse({ params }),
        staleTime: QR_TIME_CACHE,
    });
    const dataCourse = course?.data ?? [];

    return (
        <div className={style.course}>
            <div className={style.course_slider}>
                <div className={style.course_header}>
                    <h2 className={style.course_title}>
                        Khóa học{" "}
                        <span className={style.blue_color}>Nổi bật</span>
                    </h2>
                    {!IS_MB && (
                        <div className={style.course_control}>
                            <PrevArrow slider={slider} />
                            <NextArrow slider={slider} />
                        </div>
                    )}
                </div>
                <Slider ref={slider} {...settings}>
                    {dataCourse
                        ?.slice(0, 2)
                        ?.map((item: ICourse, index: number) => (
                            <Link href={`/khoa-hoc/${item?.id}`} key={index}>
                                <div className={style.course_slider_item}>
                                    <div className={style.course_left}>
                                        {/* <Image
                                            fetchPriority="high"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            src={`${baseUrl}${
                                                item?.attributes?.image?.data
                                                    ?.attributes?.url ?? ""
                                            }`}
                                            alt={
                                                item?.attributes?.image?.data
                                                    ?.attributes?.name ?? ""
                                            }
                                            priority={true}
                                        /> */}
                                        <img
                                            src={`${baseUrl}${
                                                item?.attributes?.image?.data
                                                    ?.attributes?.url ?? ""
                                            }`}
                                            alt={
                                                item?.attributes?.image?.data
                                                    ?.attributes?.name ?? ""
                                            }
                                        />
                                    </div>
                                    <div className={style.course_right}>
                                        <p className={style.course_txt}>
                                            Khóa học
                                        </p>
                                        <h3 className={style.course_name}>
                                            {item?.attributes?.name}
                                        </h3>
                                        <div className={style.course_author}>
                                            <div
                                                className={
                                                    style.course_author_img
                                                }
                                            >
                                                <Avatar
                                                    alt="author"
                                                    src={`${baseUrl}${item?.attributes?.teacher?.data?.attributes?.avatar?.data?.attributes?.url}`}
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                    }}
                                                />
                                            </div>
                                            <p
                                                className={
                                                    style.course_author_name
                                                }
                                            >
                                                {
                                                    item?.attributes?.teacher
                                                        ?.data?.attributes?.name
                                                }
                                            </p>
                                        </div>
                                        <p className={style.course_txt}>
                                            Ngày khai giảng
                                        </p>
                                        <p className={style.course_time}>
                                            {dayjs(
                                                item?.attributes?.startDate
                                            ).format("DD-MM-YYYY") ?? 0}
                                        </p>
                                        <Button
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </Slider>
            </div>

            <div className={style.course_wrap}>
                <h2 className={style.course_title}>
                    <span className={style.blue_color}> Lộ Trình Học </span>
                    Frontend master
                </h2>

                <p className={style.course_desc}>
                    Để trở thành Lập trình viên Frontend bạn sẽ phải trải qua lộ
                    trình gồm{" "}
                    <span className={`${style.blue_color} ${style.font_bold}`}>
                        4 giai đoạn
                    </span>{" "}
                    và hoàn thành
                    <span className={`${style.blue_color} ${style.font_bold}`}>
                        {" "}
                        5 dự án thực tế{" "}
                    </span>
                    trong một môi trường học giống như khi bạn đi làm.
                </p>

                <div className={style.course_list}>
                    {dataCourse
                        ?.slice(0, 3)
                        .map((item: ICourse, index: number) => (
                            <CourseItem key={item?.id} itemCourse={item} />
                        ))}
                </div>
                <div className={style.btn_seemore}>
                    <Button size="large" variant="contained" color="secondary">
                        <Link href="/danh-sach-khoa-hoc">Xem Thêm</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

function NextArrow(props: any) {
    const { slider } = props;
    const IS_MB = useMediaQuery("(max-width:1023px)");
    return (
        <Fab
            onClick={() => slider?.current?.slickNext()}
            color="secondary"
            aria-label="add"
            className={style.slider_btn_next}
            size={IS_MB ? "small" : "large"}
        >
            <FaAngleRight color="#fff" />
        </Fab>
    );
}

function PrevArrow(props: any) {
    const { slider } = props;
    const IS_MB = useMediaQuery("(max-width:1023px)");
    return (
        <Fab
            onClick={() => slider?.current?.slickPrev()}
            color="secondary"
            aria-label="add"
            className={style.slider_btn_prev}
            size={IS_MB ? "small" : "large"}
        >
            <FaAngleLeft color="#fff" />
        </Fab>
    );
}
