import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInState, userState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { signup, updateProfile, updateUser } from "../api";
import getUser from "../pages/home";

const SignUpContainer = styled.div``;
const SignUpForm = styled.form``;
const SignUpEmailText = styled.p``;
const SignUpEmailInput = styled.input``;
const SignUpUserText = styled.p``;
const SignUpUserInput = styled.input``;
const SignUpPsdText = styled.p``;
const SignUpPsdInput = styled.input``;
const SignUpPsdConfirmText = styled.p``;
const SignUpImgInput = styled.input`
  display: none;
`;
const FileUploadBtn = styled.button``;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;
const SignUpBtn = styled.button``;
const SignInPage = styled.button``;

const SignUp = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name !== "displayName") setSignUpData({ ...signUpData, [name]: value });
    if (name !== "password") {
      setUser({
        ...user,
        [name]: value,
        userId: new Date().getTime(),
      });
    }
    console.log(user);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup(signUpData);
      setIsLoggedIn(true);
      navigate("/");
      await updateUser(user);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
        <SignUpEmailText>Email</SignUpEmailText>
        <SignUpEmailInput
          type="text"
          name="email"
          value={signUpData.email}
          onChange={handleChange}
        ></SignUpEmailInput>
        <SignUpUserText>Username</SignUpUserText>
        <SignUpUserInput
          type="text"
          name="displayName"
          value={user.displayName}
          onChange={handleChange}
        ></SignUpUserInput>
        <SignUpPsdText>Password</SignUpPsdText>
        <SignUpPsdInput
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        ></SignUpPsdInput>
        <SignUpPsdConfirmText>이미지 등록</SignUpPsdConfirmText>

        <SignUpBtn>Register</SignUpBtn>
      </SignUpForm>
      <SignInPage
        onClick={() => {
          navigate(-1);
        }}
      >
        Signin
      </SignInPage>
    </SignUpContainer>
  );
};

export default SignUp;
