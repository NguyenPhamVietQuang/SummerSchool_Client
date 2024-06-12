import { IUser } from "@/interfaces/profile.type";
import { Avatar } from "@mui/material";
import { ChangeEvent } from "react";
import { BsCameraFill } from "react-icons/bs";
import style from "./style.module.css";


interface ButtonUploadProps {
    multiple?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    iconSize?: number;
    iconColor?: string;
    profile: IUser | null;
}

export const ButtonUpload = (props: ButtonUploadProps) => {
    const { multiple, onChange, profile } = props;
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const change = (e: ChangeEvent<HTMLInputElement>) =>
        onChange && onChange(e);
    // console.log(profile)
    return (
        <>
            <label
                style={{
                    pointerEvents: "fill",
                }}
                htmlFor="file"
            >
                <div className={style.form_ava_box}>
                    <input
                        multiple={multiple}
                        onChange={change}
                        autoComplete="off"
                        type="file"
                        id="file"
                        name="file"
                        hidden
                        accept="image/jpeg,image/png,img/jpg"
                    />
                    <div className={style.form_ava}>
                        <Avatar
                            sx={{
                                width: 128,
                                height: 128,
                            }}
                            alt={profile?.attributes?.username}
                            src={
                                `${baseUrl}${profile?.attributes?.avatar?.url}` ??
                                ""
                            }
                        />
                        <div className={style.form_edit}>
                            <BsCameraFill
                                style={{
                                    color: "#fff",
                                }}
                                size={20}
                            />
                        </div>
                    </div>
                </div>
            </label>
        </>
    );
};
