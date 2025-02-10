/** @jsxImportSource @emotion/react */
import { useLocation, useNavigate } from "react-router-dom";
import { UserInfo } from "../../types";
import React, { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import { MY_PAGE_PATH } from "../../constants";
import * as css from "./style";
import { Box } from "@mui/material";

const MY_PAGE_API_URL = `http://localhost:8082/api/v1/my-page`;

export default function UpdateMyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const [formData, setFormData] = useState<UserInfo>({
    id: location.state?.id || 0,
    userId: location.state?.userId || "",
    password: "",
    name: location.state?.name || "",
    email: location.state?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        MY_PAGE_API_URL,
        { password: formData.password, email: formData.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("정보 수정이 완료되었습니다.");
      navigate(MY_PAGE_PATH);
    } catch (error) {
      console.error("업데이트 중 오류가 발생했습니다.", error);
    }
  };
  return (
    <div>
      <h2 css={css.titleStyle}>정보 수정</h2>
      <Box css={css.container}>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>아이디</div>
          <input
            type="text"
            css={css.infoText}
            value={formData.userId}
            disabled
          />
        </div>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>비밀번호</div>
          <input 
            type="password"
            name="password"
            css={css.updateInfoText}
            value={formData.password} 
            onChange={handleChange}
          />
        </div>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>이름</div>
          <input 
            type="text" 
            css={css.infoText} 
            value={formData.name} 
          />
        </div>
        <div css={css.infoBox}>
          <div css={css.infoTitle}>이메일</div>
          <input
            type="text"
            name="email"
            css={css.updateInfoText}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div css={css.infoButtons}>
          <button css={css.infoButton} onClick={handleSubmit}>완료</button>
          <button css={css.infoButton} onClick={() => navigate(MY_PAGE_PATH)}>
            취소
          </button>
        </div>
      </Box>
    </div>
  );
}
