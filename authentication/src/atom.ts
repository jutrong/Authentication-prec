import { atom } from "recoil";

interface User {
  email: string;
  displayName: string;
  userId: number;
}

export const userState = atom<User>({
  key: "user",
  default: {
    email: "",
    displayName: "",
    userId: 0,
  },
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("token") ? true : false,
});
