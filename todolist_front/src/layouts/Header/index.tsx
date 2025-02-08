import React, { useEffect, useState } from "react";
import UseAuthStore from "../../stores/auth.store";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { MAIN_PATH, MY_PAGE_PATH, SIGN_IN_PATH } from "../../constants";
import "../../styles/Header.css";

export default function Header() {
  //# 사용자의 인증 상태를 전역 상태 관리
  const { logout } = UseAuthStore();

  //# 사용자의 토큰을 관리하는 쿠키
  const [cookies, setCookies] = useCookies(["token"]);
  const token = cookies.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      logout();
    }
  }, [token, logout]);

  const handleNavigateMain = () => {
    navigate(MAIN_PATH);
  }

  const handleNavigateLogout = () => {
    setCookies("token", "", { expires: new Date() });
    logout();
    navigate(MAIN_PATH);
  };

  const handleNavigateMyPage = () => {
    navigate(MY_PAGE_PATH);
  };

  const handleNavigateSignIn = () => {
    navigate(SIGN_IN_PATH);
  }
  return (
    <div className="headerContainer">
      <Box className="themeButton">
        <Button
          variant="contained"
          onClick={handleNavigateMain}
          style={{ backgroundColor: "#f4a261" }}
        >
          메인으로
        </Button>
      </Box>

      <Box className="logo">
        <Typography variant="h3">Todo-List</Typography>
      </Box>
      <Box className="authSection">
        {token ? (
          <>
            <Typography
              className="authText"
              variant="subtitle1"
              onClick={handleNavigateMyPage}
            >
              마이페이지
            </Typography>
            <Typography
              className="authText"
              variant="subtitle1"
              onClick={handleNavigateLogout}
            >
              로그아웃
            </Typography>
          </>
        ) : (
            <Typography 
              className="authText"
              variant="subtitle1" 
              onClick={handleNavigateSignIn}
            >
              로그인
            </Typography>
        )}
      </Box>
    </div>
  );
}
