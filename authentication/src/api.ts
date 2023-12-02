import axios from "axios";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts";

export const login = async (formData: { email: string; password: string }) => {
  const response = await axios.post(
    `${BASE_URL}:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    formData
  );
  const { email, idToken } = response.data;
  localStorage.setItem("token", idToken);

  return { email, idToken };
};

export const signup = async (formData: { email: string; password: string }) => {
  const response = await axios.post(
    `${BASE_URL}:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    formData
  );
  const { idToken, refreshToken, expiresIn, email } = response.data;

  localStorage.setItem("token", idToken);

  return { idToken, refreshToken, expiresIn, email };
};

export const logout = async () => {
  try {
    await axios.post(`"/api"`);

    localStorage.removeItem("token");
  } catch (error) {
    console.log("Error during logout", error);
  }
};
