import { atom } from "recoil";
import axios from "axios";

interface User {
  username: string;
  email: string;
  token?: string;
}

export const userState = atom<User>({
  key: "user",
  default: { username: "", email: "" },
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedIn",
  default: localStorage.getItem("token") ? true : false,
});

export const login = async (formData: { email: string; password: string }) => {
  const response = await axios.post("/api", formData);
  const { username, email, token } = response.data;
  localStorage.setItem("token", token);

  return { username, email, token };
};

export const signup = async (formData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api", formData);
  const { username, email, token } = response.data;

  localStorage.setItem("token", token);

  return { username, email, token };
};

export const logout = async () => {
  try {
    await axios.post("/api");

    localStorage.removeItem("token");
  } catch (error) {
    console.log("Error during logout", error);
  }
};
