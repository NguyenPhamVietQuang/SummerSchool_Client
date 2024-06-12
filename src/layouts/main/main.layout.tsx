import { LayoutProps } from "@/common";
import style from "./style.module.css";
import { Container } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";

export function MainLayout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <div className={style.mainLayout}>{children}</div>
            <Footer />
        </>
    );
}
