/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as css from "./style";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../types";
import { useCookies } from "react-cookie";
import axios from "axios";
import { MAIN_PATH, MY_PAGE_UPDATE_PATH } from "../../constants";
import { Box } from "@mui/material";

const MY_PAGE_API_URL = `http://localhost:8082/api/v1/my-page`;

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    userId: "",
    password: "",
    name: "",
    email: "",
  });
  const [cookies, removeCookies] = useCookies(["token"]);
  const token = cookies.token;
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(MY_PAGE_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDelete = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      try {
        await axios.delete(MY_PAGE_API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        removeCookies("token", { path: "/" });
      } catch (error) {
        console.error("회원 탈퇴에 실패했습니다.", error);
      }
      alert("회원 탈퇴에 성공했습니다.");
      navigate(MAIN_PATH);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2 css={css.titleStyle}>마이페이지</h2>
      <Box css={css.container}>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>아이디</div>
          <input type="text" css={css.infoText} value={userInfo.userId}
          disabled
          />
        </div>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>비밀번호</div>
          <input type="password" css={css.infoText} value="********" 
          disabled
          />
        </div>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>이름</div>
          <input type="text" css={css.infoText} value={userInfo.name} 
          disabled
          />
        </div>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>이메일</div>
          <input type="text" css={css.infoText} value={userInfo.email} 
          disabled
          />
        </div>

        <div css={css.infoButtons}>
          <button
            css={css.infoButton}
            onClick={() => navigate(MY_PAGE_UPDATE_PATH, { state: userInfo })}
          >
            정보 수정
          </button>
          <button css={css.infoButton} onClick={handleDelete}>회원 탈퇴</button>
        </div>
      </Box>
    </div>
  );
}
