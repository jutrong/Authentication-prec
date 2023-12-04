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

export const updateProfile = async (formData: {
  idToken: string;
  displayName: string;
  photoUrl: string;
  returnSecureToken: boolean;
}) => {
  const response = await axios.post(
    `${BASE_URL}:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    formData
  );
  const { email, displayName, photoUrl } = response.data;

  return { email, displayName, photoUrl };
};

export const updateUser = async (formData: {
  email: string;
  displayName: string;
  userId: number;
}) => {
  const { email, displayName, userId } = formData;
  await axios.put(
    `https://authentication-b53ec-default-rtdb.firebaseio.com/users/${userId}.json`,
    { email, displayName }
  );

  return { email, displayName, userId };
};

export const logout = async () => {
  try {
    await axios.post(`"/api"`);

    localStorage.removeItem("token");
  } catch (error) {
    console.log("Error during logout", error);
  }
};
