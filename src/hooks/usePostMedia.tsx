import { uploadMediaApi } from "@/services";
import { ChangeEvent, useState } from "react";

type Media = {
    mediaId: number;
    original_url: string;
};

type PostType = {
    e: ChangeEvent<HTMLInputElement>;
    callBack?: (data: Media[]) => void;
};

export function usePostMedia() {
    const [medias, setMedias] = useState<Media[]>([]);
    const handlePostMedia = async ({ e, callBack }: PostType) => {
        if (e.target.files) {
            try {
                const mediaList: Media[] = [];
                for (var i = 0; i < e.target.files?.length; i++) {
                    const fileItem = e.target.files[i];
                    let formData = new FormData();
                    let resMedia :any = {
                        original_url: "",
                        mediaId: i,
                        };
                    formData.append("files", fileItem);
                    const res = await uploadMediaApi.uploadMedia(formData);
                    if (res) {
                        resMedia = {
                            original_url: res[0]?.url,
                            mediaId: res[0]?.id
                        };
                        // console.log("media", res)
                    }
                    mediaList.push(resMedia);
                }
                setMedias(mediaList);
                if (callBack) {
                    callBack(mediaList);
                }
            } catch (error) {}
        }
    };
    return {
        medias,
        handlePostMedia,
    };
}
