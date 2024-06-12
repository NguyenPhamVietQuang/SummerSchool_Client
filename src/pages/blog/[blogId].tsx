import { NextPageWithLayout } from "@/common";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { MainLayout } from "@/layouts";
import { blogApi } from "@/services/blog.api";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "./style.module.css";
import { Seo } from "@/components";
import markdownit from "markdown-it";


const Blog: NextPageWithLayout = () => {
    const router = useRouter();
    const patchName = router.pathname;
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const idBlog = router?.query?.blogId as string;
    const params: any = {
        populate: "*",
    };
     const md = markdownit({
         html: true,
         linkify: true,
         typographer: true,
     });
    const { data: blogDetail } = useQuery({
        queryKey: [QR_KEY.BLOG_DETAIL, idBlog],
        enabled: !!idBlog,
        retry: false,
        queryFn: () => blogApi.getBlogById(idBlog, { params }),
        staleTime: QR_TIME_CACHE,
    });

    return (
        <>
            <Seo
                title={
                    blogDetail?.data?.attributes?.title ?? "Chi tiết khóa học"
                }
                description={
                    blogDetail?.data?.attributes?.title ?? "Chi tiết khóa học"
                }
                url={router.pathname}
            />
            <Container maxWidth="md">
                <div className={style.blogPage}>
                    <h1 className={style.blogPage_title}>
                        {blogDetail?.data?.attributes?.title}
                    </h1>
                    <p className={style.blogDetailCreateAt}>
                        {dayjs(blogDetail?.data?.attributes?.createdAt).format(
                            "DD-MM-YYYY"
                        )}
                    </p>
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
                            blogDetail?.data?.attributes?.thumbnail?.data
                                ?.attributes?.url ?? ""
                        }
                                    `}
                        alt={
                            blogDetail?.data?.attributes?.thumbnail?.data
                                ?.attributes?.name ?? "image-thumnail"
                        }
                        priority={true}
                    /> */}
                    <img
                        src={`${baseUrl}${
                            blogDetail?.data?.attributes?.thumbnail?.data
                                ?.attributes?.url ?? ""
                        }
                                    `}
                        alt={
                            blogDetail?.data?.attributes?.thumbnail?.data
                                ?.attributes?.name ?? "image-thumnail"
                        }
                    />
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                md.render(
                                    `${
                                        blogDetail?.data?.attributes?.content ??
                                        "<p>Đang cập nhật</p>"
                                    }`
                                ) || "",
                        }}
                        className={style.blogDetailDesc}
                    />
                </div>
            </Container>
        </>
    );
};
export default Blog;
Blog.Layout = MainLayout;
