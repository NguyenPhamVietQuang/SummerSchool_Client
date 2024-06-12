import { InitLoaderPage } from "@/components";
import { IReqProfile } from "@/interfaces/req.type";
import { authApi } from "@/services";
import { profileApi } from "@/services/profile.api";
import { IProfileState } from "@/store/zustand/type";
import { toast } from "react-toastify";
import { create } from "zustand";

export const useProfileStore = create<IProfileState>()((set, get) => ({
    profile: null,
    isLoading: true,
    getProfile: async () => {
        if (localStorage.getItem("accessToken")) {
            try {
                const res = await profileApi.getProfile();
                set((state) => ({ profile: res.data, isLoading: false }));
            } catch (error) {
                console.log(error);
                set((state) => ({ isLoading: false }));
            }
        } else {
            set((state) => ({ isLoading: false }));
        }
    },
    logoutProfile: async () => {
        // await authApi.logout();
        localStorage.removeItem("accessToken");
        set(() => ({ profile: null }));
    },
    putProfile: (payload: any) => {
        set((state) => ({ profile: { ...state.profile, ...payload } }));
    },
    putProfileApi: async (payload: IReqProfile) => {
        if (localStorage.getItem("accessToken")) {
            try {
                const res = await profileApi.putProfile(payload);
                set((state) => ({ profile: res.data, isLoading: false }));
            } catch (error) {
                console.log(error);
                set((state) => ({ isLoading: false }));
            }
        } else {
            set((state) => ({ isLoading: false }));
        }
    },
    updateProfileAvatar: async (payload: { media_id: number, url: string }) => {
        try {
            const response = await profileApi.putProfile({
                media_id: payload.media_id
            })
            if (response) {
                const profile = get().profile
                if (profile?.attributes) {
                    profile.attributes.avatar = {
                        ...profile.attributes.avatar,
                        url: payload.url
                    } as any
                    set(() => ({ profile }))
                }
            }
            InitLoaderPage.offLoading()
            toast.success('Đã thay dổi Avatar')
        } catch (error) {
            InitLoaderPage.offLoading()
            toast.error('Có lỗi xảy ra. Vui lòng thử lại')
        }
    },
    updateProfileForm: async (payload: IReqProfile) => {
        InitLoaderPage.onLoading()
        try {
            const response = await profileApi.putProfile(payload)
            if (response) {
                get().getProfile()
            }
            InitLoaderPage.offLoading()
            toast.success('Đã cập nhật thông tin cá nhân')
        } catch (error) {
            InitLoaderPage.offLoading()
            toast.error('Có lỗi xảy ra. Vui lòng thử lại')
        }
    }
}));
