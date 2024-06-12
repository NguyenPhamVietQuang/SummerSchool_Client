import React from "react";
import style from "./style.module.css";

export default function Footer() {
    return (
        <div className={`${style.footer} ${style.container_fluid}`}>
            <p className={style.footer_text}>School Class footer</p>
        </div>
    );
}
