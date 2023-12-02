import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUpContainer = styled.div``;
const SignUpForm = styled.form``;
const SignUpEmailText = styled.p``;
const SignUpEmailInput = styled.input``;
const SignUpUserText = styled.p``;
const SignUpUserInput = styled.input``;
const SignUpPsdText = styled.p``;
const SignUpPsdInput = styled.input``;
const SignUpPsdConfirmText = styled.p``;
const SignUpPsdConfirmInput = styled.input``;
const SignUpBtn = styled.button``;
const SignInPage = styled.button``;
const SignUp = () => {
  const navigate = useNavigate();
  return (
    <SignUpContainer>
      <SignUpForm>
        <SignUpEmailText>Email</SignUpEmailText>
        <SignUpEmailInput></SignUpEmailInput>
        <SignUpUserText>Username</SignUpUserText>
        <SignUpUserInput></SignUpUserInput>
        <SignUpPsdText>Password</SignUpPsdText>
        <SignUpPsdInput></SignUpPsdInput>
        <SignUpPsdConfirmText>Password Confirm</SignUpPsdConfirmText>
        <SignUpPsdConfirmInput></SignUpPsdConfirmInput>
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
