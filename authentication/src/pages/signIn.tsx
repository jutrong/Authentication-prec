import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInState, userDataState, userState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getUser, login } from "../api";

const SignInContainer = styled.div``;
const SignInForm = styled.form``;
const SignInEmailText = styled.p``;
const SignInEmailInput = styled.input``;
const SignInPwdText = styled.p``;
const SignInPwdInput = styled.input``;
const SignInBtn = styled.button``;
const SignUpBtn = styled.button``;
const SocialLogin = styled.div``;
const GoogleLogin = styled.div``;
const NaverLogin = styled.div``;
const KakaoLogin = styled.div``;

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [userData, setUserData] = useRecoilState(userDataState);
  const [user, setUser] = useRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
      await login(formData);
      setIsLoggedIn(true);
      const userDisplayData = await getUser(user);
      setUserData({ ...userDisplayData });
      console.log(userData);
      navigate("/");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <SignInContainer>
      <SignInForm onSubmit={handleSubmit}>
        <SignInEmailText>Email</SignInEmailText>
        <SignInEmailInput
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></SignInEmailInput>
        <SignInPwdText>Password</SignInPwdText>
        <SignInPwdInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></SignInPwdInput>
        <SignInBtn type="submit">Login</SignInBtn>
      </SignInForm>
      <SignUpBtn
        onClick={() => {
          navigate("/signup");
        }}
      >
        SignUp
      </SignUpBtn>
      <SocialLogin>
        <GoogleLogin />
        <NaverLogin />
        <KakaoLogin />
      </SocialLogin>
    </SignInContainer>
  );
};

export default SignIn;
