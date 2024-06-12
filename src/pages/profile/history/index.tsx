import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { Card } from "@/components/card";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { IOrderCourse } from "@/interfaces/orderCourse.type";
import { ProfileLayout } from "@/layouts";
import { courseApi } from "@/services";
import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";

const History: NextPageWithLayout = () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const params: { populate: string } = {
        populate: "teacher, teacher.avatar, image",
    };
    const { data: courseOrder } = useQuery({
        queryKey: [QR_KEY.COURSE_ORDER],
        queryFn: () => courseApi.getCourseOrder({ params }),
        staleTime: 1000,
    });
    const dataCourseOrder = courseOrder?.data ?? [];

    return (
        <>
            <Seo title="Khóa học đã đăng ký" description="" url="" />
            <Card title={"Khóa học đã đăng ký"}>
                <div className={style.edit_profile_body}>
                    <div className={style.profile_his_list}>
                        {dataCourseOrder.length !== 0 ? (
                            dataCourseOrder?.map((item: any) => (
                                <Link
                                    href={`/khoa-hoc/${item?.courses[0]?.id}`}
                                    key={item?.id}
                                    className={style.profile_his_item}
                                >
                                    <div className={style.his_item_img}>
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
                                                item?.courses[0]?.image?.url ??
                                                ""
                                            }`}
                                            alt={
                                                item?.courses[0]?.image?.name ??
                                                ""
                                            }
                                            priority={true}
                                        /> */}
                                        <img
                                            src={`${baseUrl}${
                                                item?.courses[0]?.image?.url ??
                                                ""
                                            }`}
                                            alt={
                                                item?.courses[0]?.image?.name ??
                                                ""
                                            }
                                        />
                                    </div>
                                    <div className={style.his_content}>
                                        <div className={style.his_name}>
                                            {item?.courses[0]?.name}
                                        </div>
                                        <div className={style.his_author}>
                                            <Avatar
                                                alt={
                                                    item?.courses[0]?.teacher
                                                        ?.name
                                                }
                                                src={`${baseUrl}${item?.courses[0]?.teacher?.avatar?.url}`}
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                }}
                                            />
                                            <p>
                                                {
                                                    item?.courses[0]?.teacher
                                                        ?.name
                                                }
                                            </p>
                                        </div>
                                        <div className={style.his_course_info}>
                                            <p
                                                className={
                                                    style.his_numberOfSessions
                                                }
                                            >
                                                {
                                                    item?.courses[0]
                                                        ?.numberOfSessions
                                                }{" "}
                                                Buổi
                                            </p>
                                            <p className={style.his_startDate}>
                                                {item?.courses[0]?.startDate}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className={style.not_register}>
                                Bạn chưa đăng ký khóa học nào
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
};
export default History;
History.Layout = ProfileLayout;
