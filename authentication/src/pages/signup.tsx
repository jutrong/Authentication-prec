import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInState, userDataState, userState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getUser, signup, updateProfile, updateUser } from "../api";

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
  object-fit: fill;
`;
const SignUpBtn = styled.button``;
const SignInPage = styled.button``;

interface UploadImage {
  file: File;
  thumbnail: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useRecoilState(userState);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);
  const [userData, setUserData] = useRecoilState(userDataState);
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
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup(signUpData);
      setIsLoggedIn(true);
      await updateUser(user);
      const userDisplayData = await getUser(user);
      setUserData({ ...userDisplayData });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (fileList && fileList[0]) {
        const url = URL.createObjectURL(fileList[0]);

        setImageFile({
          file: fileList[0],
          thumbnail: url,
        });
        setUser({ ...user, userImage: url });
      }
    },
    []
  );
  const onUploadImageButtonClick = useCallback(() => {
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  }, []);

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
        <SignUpImgInput
          type="file"
          accept="imgae/*"
          ref={fileInputRef}
          onChange={onUploadImage}
        />
        <FileUploadBtn onClick={onUploadImageButtonClick}>
          이미지 선택
        </FileUploadBtn>
        <ProfileImg src={imageFile?.thumbnail} alt="프로필 이미지" />

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
