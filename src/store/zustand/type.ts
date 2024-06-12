import { IUser } from "@/interfaces/profile.type";
import { IReqProfile } from "@/interfaces/req.type";
import { IRegister } from "@/services";

export type IProfileState = {
    profile: IUser | null;
    isLoading: boolean;
    getProfile: () => Promise<void>;
    logoutProfile: () => Promise<void>;
    putProfile: (newProfile: IUser) => void;
    putProfileApi: (newProfile: IReqProfile) => void;
    updateProfileAvatar: (payload: { media_id: number, url: string }) => void;
    updateProfileForm:(payload:IReqProfile) => void
};