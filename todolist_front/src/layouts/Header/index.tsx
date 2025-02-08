import React, { useEffect, useState } from "react";
import UseAuthStore from "../../stores/auth.store";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useThemeStore from "../../stores/theme.store";
import { MAIN_PATH } from "../../constants";
import '../../styles/Header.css'

export default function Header() {

  //# 사용자의 인증 상태를 전역 상태 관리
  const { isAuthenticated, user, logout, login } = UseAuthStore();

  //# 전체 테마의 상태를 전역 상태 관리 
  const { theme, toggleTheme } = useThemeStore();

  //# 사용자의 토큰을 관리하는 쿠키 
  const [cookies, setCookies] = useCookies(['token']);

  useEffect(() => {
    if (!cookies.token) {
      logout();
    }
  }, [cookies.token, logout])

  //# event handler: 로그아웃 버튼 클릭 시 이벤트 핸들러 //
  const handleLogoutClick = ()  => {
    setCookies('token', '', { expires: new Date() });
    logout();
  }

  return (
    <div className='headerContainer'>
        <Box className='themeButton'>
          <Button variant="contained" onClick={toggleTheme} style={{ backgroundColor: "#f4a261"}}>
            {theme === 'light' ? '다크 모드' : '라이트 모드'}
          </Button>
        </Box>
          
        <Box className='logo'>
          <Typography variant="h3">Todo-List</Typography>
        </Box>
        <Box className='authSection'>
          {isAuthenticated ? (
            <Typography 
              className='authText'
              variant="subtitle1" 
              onClick={handleLogoutClick}>
              로그아웃
            </Typography>
          ) : (
            <Link
              to={MAIN_PATH}
              className='authText'
            >
              <Typography variant="subtitle1">로그인</Typography>
            </Link>
          )}
        </Box>
    </div>
  );
}
