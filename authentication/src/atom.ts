import { atom } from "recoil";

interface User {
  email: string;
}

export const userState = atom<User>({
  key: "user",
  default: { email: "" },
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("token") ? true : false,
});
