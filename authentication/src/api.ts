import axios from "axios";

export const login = async (formData: { email: string; password: string }) => {
  const response = await axios.post("/api", formData);
  const { username, email, idToken } = response.data;
  localStorage.setItem("token", idToken);

  return { username, email, idToken };
};

export const signup = async (formData: {
  email: string;
  password: string;
  // passwordConfirm?: string;
}) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    formData
  );
  const { idToken, refreshToken, expiresIn, email } = response.data;

  localStorage.setItem("token", idToken);

  return { idToken, refreshToken, expiresIn, email };
};

export const logout = async () => {
  try {
    await axios.post("/api");

    localStorage.removeItem("token");
  } catch (error) {
    console.log("Error during logout", error);
  }
};