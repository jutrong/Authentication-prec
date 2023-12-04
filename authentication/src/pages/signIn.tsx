import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInState, userState } from "../atom";
import { useSetRecoilState } from "recoil";
import { login } from "../api";

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
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loggedInUser = await login(formData);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
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
