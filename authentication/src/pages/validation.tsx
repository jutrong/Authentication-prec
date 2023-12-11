import { useRef, useState } from "react";
import { styled } from "styled-components";

interface UploadImage {
  file: File;
  thumbnail: string;
}
const SignUpContainer = styled.div``;
const SignUpForm = styled.form``;
const SignUpEmailText = styled.p``;
const SignUpEmailInput = styled.input``;
const SignUpEmailduplication = styled.button``;
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
  margin-left: 50px;
`;
const SignUpBtn = styled.button`
  display: block;
  margin-top: 50px;
  border: none;
  background-color: crimson;
  padding: 5px 15px;
  border-radius: 5px;
  color: white;
  width: 200px;
`;

const Validation = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      setImageFile({
        file: fileList[0],
        thumbnail: url,
      });
    }
  };

  const onUploadImageButtonClick = () => {
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  };

  return (
    <>
      <SignUpContainer>
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpEmailText>Email</SignUpEmailText>
          <SignUpEmailInput
            type="text"
            name="email"
            onChange={handleChange}
          ></SignUpEmailInput>
          <SignUpEmailduplication>중복확인</SignUpEmailduplication>
          <SignUpUserText>Username</SignUpUserText>
          <SignUpUserInput
            type="text"
            name="displayName"
            onChange={handleChange}
          ></SignUpUserInput>
          <SignUpPsdText>Password</SignUpPsdText>
          <SignUpPsdInput
            type="password"
            name="password"
            onChange={handleChange}
          ></SignUpPsdInput>
          <SignUpPsdText>PasswordConfirm</SignUpPsdText>
          <SignUpPsdInput
            type="password"
            name="passwordConfirm"
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
      </SignUpContainer>
    </>
  );
};

export default Validation;
