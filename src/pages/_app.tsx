import { AppPropsWithLayout } from "@/common";
import { queryClient } from "@/configs";
import { AppProvider } from "@/context";
import { EmptyLayout } from "@/layouts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "lightgallery/css/lg-thumbnail.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lightgallery.css";
// import "react-loading-skeleton/dist/skeleton.css";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRef, FC, useEffect } from "react";
import { InitLoaderPage, LoaderPage, LoaderPageHandle } from "@/components";
const theme = createTheme({
    typography: {
        fontFamily: [
            "Helvetica",
            "Courier",
            "monospace",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    palette: {
        primary: {
            main: "#12131a",
            contrastText: "#fff",
        },
        secondary: {
            main: "#00afab",
            contrastText: "#fff",
        },
        action: {
            disabledBackground: "var(--primary-cl)",
            disabled: "#fff",
        },
    },
});
export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        <>
            <AppProvider>
                <ToastContainer autoClose={1500} />
                <RegisterGlobalContainer />
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeProvider>
                </QueryClientProvider>
            </AppProvider>
        </>
    );
}

const RegisterGlobalContainer: FC = () => {
    const loaderPageRef = createRef<LoaderPageHandle>()
    useEffect(() => {
        InitLoaderPage.register(loaderPageRef)
    }, [loaderPageRef])
    return (
        <>
            <LoaderPage ref={loaderPageRef} />
        </>
    )
}
