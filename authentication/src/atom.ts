import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface User {
  email: string;
  displayName: string;
  userId: number;
  userImage: string;
}
export interface UserData {
  email?: string;
  displayName?: string;
  userImage?: string;
}
const { persistAtom } = recoilPersist();
export const userState = atom<User>({
  key: "user",
  default: {
    email: "",
    displayName: "",
    userId: 0,
    userImage: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const userDataState = atom<UserData>({
  key: "userData",
  default: {
    email: "",
    displayName: "",
    userImage: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("token") ? true : false,
});
