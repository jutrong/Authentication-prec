import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataState } from "../atom";
import styled from "styled-components";

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: fill;
`;

const Home = () => {
  const userData = useRecoilValue(userDataState);
  const navigate = useNavigate();

  return (
    <div>
      {userData && (
        <>
          <div>displayName: {userData.displayName}</div>
          <div>email: {userData.email}</div>
          <div>
            ProfileImg :
            <ProfileImg src={userData.userImage} alt="프로필 이미지" />
          </div>
        </>
      )}
      <button
        onClick={() => {
          navigate("/signin");
        }}
      >
        Signin
      </button>
    </div>
  );
};

export default Home;
