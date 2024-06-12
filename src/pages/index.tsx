import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { HomeBanner } from "@/components/page/home/homeBanner";
import HomeCourse from "@/components/page/home/homeCourse";
import { HomeLayout } from "@/layouts";
import { Container } from "@mui/material";

const Home: NextPageWithLayout = (props) => {
    return (
        <>
            <Seo
                title="Summer Class"
                description="Trang chủ Summer Class"
                url=""
            />
            <main>
                <HomeBanner />
                <Container sx={{ maxWidth: "1440px" }}>
                    <HomeCourse />
                </Container>
            </main>
        </>
    );
};
export default Home;
Home.Layout = HomeLayout;
