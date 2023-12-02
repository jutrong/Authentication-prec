import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInState, userState } from "../atom";
import { useSetRecoilState } from "recoil";
import { signup } from "../api";

const SignUpContainer = styled.div``;
const SignUpForm = styled.form``;
const SignUpEmailText = styled.p``;
const SignUpEmailInput = styled.input``;
// const SignUpUserText = styled.p``;
// const SignUpUserInput = styled.input``;
const SignUpPsdText = styled.p``;
const SignUpPsdInput = styled.input``;
// const SignUpPsdConfirmText = styled.p``;
// const SignUpPsdConfirmInput = styled.input``;
const SignUpBtn = styled.button``;
const SignInPage = styled.button``;

const SignUp = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const [signUpData, setSignUpData] = useState({
    email: "",
    // username: "",
    password: "",
    // passwordComfirm: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loggedInUser = await signup(signUpData);
      setUser(loggedInUser);
      setIsLoggedIn(true);
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
        {/* <SignUpUserText>Username</SignUpUserText>
        <SignUpUserInput
          type="text"
          name="username"
          value={signUpData.username}
          onChange={handleChange}
        ></SignUpUserInput> */}
        <SignUpPsdText>Password</SignUpPsdText>
        <SignUpPsdInput
          type="password"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
        ></SignUpPsdInput>
        {/* <SignUpPsdConfirmText>Password Confirm</SignUpPsdConfirmText>
        <SignUpPsdConfirmInput
          type="password"
          name="passwordComfirm"
          value={signUpData.passwordComfirm}
          onChange={handleChange}
        ></SignUpPsdConfirmInput> */}
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
