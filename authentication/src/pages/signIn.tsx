import styled from "styled-components";
import { useState } from "react";

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
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);
  return (
    <SignInContainer>
      <SignInForm>
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
      <SignUpBtn>SignUp</SignUpBtn>
      <SocialLogin>
        <GoogleLogin />
        <NaverLogin />
        <KakaoLogin />
      </SocialLogin>
    </SignInContainer>
  );
};

export default SignIn;
