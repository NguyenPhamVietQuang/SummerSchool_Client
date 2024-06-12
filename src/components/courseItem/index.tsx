import { ICourse, ICourseDetail } from "@/interfaces/course.type";
import { Avatar, Button } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";
interface IProps {
    itemCourse: ICourse;
}
export default function CourseItem(props: IProps) {
    const { itemCourse } = props;
    const item = itemCourse?.attributes;
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    return (
        <Link
            href={`/khoa-hoc/${itemCourse?.id}`}
            className={style.course_item}
        >
            <div className={style.course_item_left}>
                {/* <Image
                    fetchPriority="high"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    src={
                        item
                            ? `${baseUrl}${item?.image?.data?.attributes?.url}`
                            : ""
                    }
                    alt={`${item?.image?.data?.attributes?.name ?? ""}`}
                    priority={true}
                /> */}
                <img
                    src={
                        item
                            ? `${baseUrl}${item?.image?.data?.attributes?.url}`
                            : ""
                    }
                    alt={`${item?.image?.data?.attributes?.name ?? ""}`}
                />
            </div>
            <div className={style.course_item_right}>
                <h3 className={style.course_name}>{item?.name}</h3>
                <div className={style.course_info}>
                    <div className={style.course_author}>
                        <div className={style.course_author_img}>
                            <Avatar
                                alt="author"
                                src={`${baseUrl}${item?.teacher?.data?.attributes?.avatar?.data?.attributes?.url}`}
                                sx={{
                                    width: 36,
                                    height: 36,
                                }}
                            />
                        </div>
                        <p className={style.course_author_name}>
                            {item?.teacher?.data?.attributes?.name}
                        </p>
                    </div>
                    <p className={style.course_time}>
                        {dayjs(item?.startDate).format("DD-MM-YYYY") ?? 0}
                    </p>
                </div>
                <Button
                    size="large"
                    variant="outlined"
                    color="secondary"
                    // onClick={handleAgree}
                >
                    Xem chi tiết
                </Button>
            </div>
        </Link>
    );
}
