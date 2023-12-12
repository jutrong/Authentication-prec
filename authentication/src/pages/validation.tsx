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
  background-color: ${({ disabled }) => (disabled ? "gray" : "green")};
  padding: 5px 15px;
  border-radius: 5px;
  color: white;
  width: 200px;
`;

const Validation = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);
  const [inputValue, setInputValue] = useState({
    email: "", // 입력된 이메일 데이터
    validEmail: false, // 이메일 정규식 충족 여부
    nonIdDuplication: false, // 이메일 중복확인 여부
    displayName: "", // 입력된 닉네임 데이터
    validDisplayName: false, // 닉네임 정규식 충족 여부
    password: "", // 입력된 비밀번호 데이터
    validPassword: false, // 비밀번호 정규식 충족 여부
    passwordConfirm: "", // 입력된 비밀번호 확인 데이터
    correctPwCheck: false, // 패스워드 데이터와 일치 여부
    profileImg: "", // 업로드된 프로필 이미지 (선택)
  });
  const [errorMessages, setErrorMessages] = useState({
    emailError: "",
    displayNameError: "",
    passwordError: "",
    passwordConfirmError: "",
  });
  const submitRequirements =
    inputValue.email &&
    inputValue.validEmail &&
    // inputValue.nonIdDuplication &&
    inputValue.displayName &&
    inputValue.validDisplayName &&
    inputValue.password &&
    inputValue.validPassword &&
    inputValue.correctPwCheck;

  const inputRegexs = {
    idRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // 영문 숫자 특수기호 8자이상
    pwRegex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    nicknameRegex: /^[a-zA-Z가-힣]{2,8}$/,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevValue) => ({ ...prevValue, [name]: value }));

    let isEmailValid = false;
    let displayNameValid = false;
    let psdValid = false;
    let psdConfirm = false;
    let errorMessage = "";

    switch (name) {
      case "email":
        isEmailValid = inputRegexs.idRegex.test(value);
        errorMessage = isEmailValid ? "" : "유효하지 않은 이메일 형식입니다.";
        setInputValue((prev) => ({ ...prev, validEmail: isEmailValid }));
        break;
      case "displayName":
        displayNameValid = inputRegexs.nicknameRegex.test(value);
        errorMessage = displayNameValid
          ? ""
          : "유효하지 않은 닉네임 형식입니다.";
        setInputValue((prev) => ({
          ...prev,
          validDisplayName: displayNameValid,
        }));
        break;
      case "password":
        psdValid = inputRegexs.pwRegex.test(value);
        errorMessage = psdValid ? "" : "유효하지 않은 비밀번호 형식입니다.";
        setInputValue((prev) => ({ ...prev, validPassword: psdValid }));
        break;
      case "passwordConfirm":
        psdConfirm = inputValue.password === value;
        errorMessage = psdConfirm ? "" : "비밀번호가 같지 않습니다";
        setInputValue((prev) => ({
          ...prev,
          correctPwCheck: psdConfirm,
        }));
        break;
      default:
        break;
    }
    // console.log(`isValid: ${isEmailValid}, errorMessage: ${errorMessage}`);

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: errorMessage,
    }));
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
  console.log(inputValue);

  return (
    <>
      <SignUpContainer>
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpEmailText>Email</SignUpEmailText>
          <SignUpEmailInput
            type="text"
            name="email"
            onChange={handleChange}
            value={inputValue.email}
          ></SignUpEmailInput>
          <SignUpEmailduplication>중복확인</SignUpEmailduplication>
          <div>{errorMessages.emailError}</div>
          <SignUpUserText>Username</SignUpUserText>
          <SignUpUserInput
            type="text"
            name="displayName"
            onChange={handleChange}
            value={inputValue.displayName}
          ></SignUpUserInput>
          <div>{errorMessages.displayNameError}</div>
          <SignUpPsdText>Password</SignUpPsdText>
          <SignUpPsdInput
            type="password"
            name="password"
            onChange={handleChange}
            value={inputValue.password}
          ></SignUpPsdInput>
          <div>{errorMessages.passwordError}</div>
          <SignUpPsdText>PasswordConfirm</SignUpPsdText>
          <SignUpPsdInput
            type="password"
            name="passwordConfirm"
            onChange={handleChange}
            value={inputValue.passwordConfirm}
          ></SignUpPsdInput>
          <div>{errorMessages.passwordConfirmError}</div>
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
          <SignUpBtn
            disabled={!submitRequirements}
            className={submitRequirements ? "enabled" : "disabled"}
          >
            Register
          </SignUpBtn>
        </SignUpForm>
      </SignUpContainer>
    </>
  );
};

export default Validation;
