import { NextPageWithLayout } from "@/common";
import CourseInfo from "@/components/page/courseDetail/courseInfo";
import CourseTeacher from "@/components/page/courseDetail/courseTeacher";
import { MainLayout } from "@/layouts";
import { Container } from "@mui/material";
import React from "react";

const CourseDetail: NextPageWithLayout = () => {
    return (
        <>
            <CourseInfo />
            <Container maxWidth="lg">{/* <CourseTeacher /> */}</Container>
        </>
    );
};

export default CourseDetail;
CourseDetail.Layout = MainLayout;
