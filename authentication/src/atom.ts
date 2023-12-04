import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface User {
  email: string;
  displayName: string;
  userId: number;
}
const { persistAtom } = recoilPersist();
export const userState = atom<User>({
  key: "user",
  default: {
    email: "",
    displayName: "",
    userId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("token") ? true : false,
});
