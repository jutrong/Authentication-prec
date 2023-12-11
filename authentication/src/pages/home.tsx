import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataState, userState } from "../atom";
import styled from "styled-components";

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: fill;
`;

const Home = () => {
  const userData = useRecoilValue(userDataState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  console.log(userData);
  return (
    <div>
      {user && (
        <>
          <div>displayName: {user.displayName}</div>
          <div>email: {user.email}</div>
          <div>
            ProfileImg :
            <ProfileImg src={user.userImage} alt="프로필 이미지" />
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
