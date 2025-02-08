/** @jsxImportSource @emotion/react */
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import UseAuthStore from "../../../stores/auth.store";
import { TODO_PATH } from "../../../constants";
import { Credentials, SignInResponseDto } from "../../../types";
import * as css from "../style";

const SIGN_IN_API_URL = `http://localhost:8082/api/v1/auth/sign-in`;

export default function SignIn() {
  const [credentials, setCredentials] = useState<Credentials>({
    userId: "",
    password: ""
  });

  const [error, setError] = useState<string>("");

  const [, setCookies] = useCookies(["token"]);

  const { login } = UseAuthStore();

  const navigate = useNavigate();

  //! 토큰 저장 함수
  const setToken = (token: string, exprTime: number) =>  {
    const expires = new Date(Date.now() + exprTime);
    setCookies('token', token, {
      path: '/',
      expires
    });
  }

  //! 로그인 성공 시 실행 함수
  const signInSuccessResponse = (data: SignInResponseDto) => {
    if (data) {
      const { token, exprTime } = data;
      setToken(token, exprTime);

      login({
        token: token
      });
      navigate(TODO_PATH);
      console.log(token); // 확인 후 삭제
    } else {
      setError('로그인 실패: 인증 정보를 확인해주세요.');
    }
  }

  //! 로그인 입력 필드 이벤트 처리 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;

    setCredentials({
      ...credentials,
      [element.name]: element.value,
    });
  }

  //! 로그인 버튼 클릭 이벤트 처리 함수
  const handleSignIn = async () => {
    const { userId, password } = credentials;

    if(!userId || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(SIGN_IN_API_URL, credentials);

      if (response.data) {
        signInSuccessResponse(response.data.data);
      }

    } catch {
      setError('로그인 중 문제가 발생했습니다.');
    }
  }

  return (
    <Box css={css.container}>
        <Typography variant="h5" mb={2}>
          로그인
        </Typography>

        <TextField
          placeholder="아이디"
          type="text"
          name="userId"
          variant="outlined"
          value={credentials.userId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          color="warning"
          css={css.inputStyle}
        />

        <TextField
          placeholder="비밀번호"
          type="password"
          name="password"
          variant="outlined"
          value={credentials.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          color="warning"
          css={css.inputStyle}
        />

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        <Button
          onClick={handleSignIn}
          fullWidth
          variant="contained"
          css={css.btnStyle}

        >
          로그인
        </Button>
    </Box>
  );
}
