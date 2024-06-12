import { NextPageWithLayout } from "@/common";
import { MainLayout } from "@/layouts";
import { Container } from "@mui/material";
import style from "./style.module.css";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { blogApi } from "@/services/blog.api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { IBlog } from "@/interfaces/blog.type";
import dayjs from "dayjs";
import Link from "next/link";
import { Seo } from "@/components";
import { useRouter } from "next/router";
import { imgs } from "@/assets/imgs";

const Blog: NextPageWithLayout = () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const params: any = {
        populate: "*",
    };
    const router = useRouter();

    const { data: blog } = useQuery({
        queryKey: [QR_KEY.BLOG],
        queryFn: () => blogApi.getBlog({ params }),
        staleTime: QR_TIME_CACHE,
    });
    const dataBlog = blog?.data ?? [];
    // console.log(dataBlog)
    return (
        <>
            <Seo
                title="Danh sách khóa học"
                description="Danh sách khóa học"
                url={router.pathname}
            />
            <Container maxWidth="md">
                <div className={style.blogPage}>
                    <h1 className={style.blogPage_title}>Bài viết</h1>
                    <div className={style.blog_list}>
                        {dataBlog?.map((item: IBlog) => (
                            <Link
                                href={`/bai-viet/${item?.id}`}
                                key={item?.id}
                                className={style.blog_item}
                            >
                                <div className={style.blog_item_left}>
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
                                            item?.attributes?.thumbnail?.data
                                                ?.attributes?.url ?? ""
                                        }
                                    `}
                                        alt={
                                            item?.attributes?.thumbnail?.data
                                                ?.attributes?.name ?? ""
                                        }
                                        priority={true}
                                    /> */}
                                    <img
                                        src={`${baseUrl}${
                                            item?.attributes?.thumbnail?.data
                                                ?.attributes?.url ?? ""
                                        }
                                    `}
                                        alt=""
                                    />
                                </div>

                                <div className={style.blog_item_right}>
                                    <h2 className={style.blog_item_name}>
                                        {item?.attributes?.title}
                                    </h2>
                                    <p className={style.blog_item_desc}>
                                        {item?.attributes?.content}
                                    </p>
                                    <p className={style.blog_item_create}>
                                        {dayjs(
                                            item?.attributes?.createdAt
                                        ).format("DD-MM-YYYY")}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
};
export default Blog;
Blog.Layout = MainLayout;
