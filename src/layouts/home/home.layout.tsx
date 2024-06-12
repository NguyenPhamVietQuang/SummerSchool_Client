import { LayoutProps } from "@/common";
import style from "./style.module.css";
// import Header from "@/components/header";
import Footer from "@/components/footer";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/header"), { ssr: false });

export function HomeLayout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <div className={style.homeLayout}>{children}</div>
            <Footer />
        </>
    );
}
