import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atom";

const Home = () => {
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
  });
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    // console.log("userData", userData);
    // console.log("user", user);
  }, [user]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://authentication-b53ec-default-rtdb.firebaseio.com/users/${user?.userId}.json`
      );
      const data = response.data;
      setUserData(data);
      console.log(response.data);
    } catch (error) {
      console.log("에러", error);
    }
  };

  return (
    <div>
      {user && (
        <>
          <div>displayName: {user.displayName}</div>
          <div>email: {user.email}</div>
          <div>email: {user.userId}</div>
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
