/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { SIGN_IN_PATH } from "../../../constants";
import * as css from "../style";

interface UserInfo {
  userId: string;
  password: string;
  checkPassword: string;
  email: string;
  name: string
}

interface Errors {
  userId?: string;
  password?: string;
  checkPassword?: string;
  email?: string;
  name?: string;
  form?: string;
}

export default function SignUp() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: "",
    password: "",
    checkPassword: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [element.name]: element.value,
    }));
  };
  const handleSignUp = async () => {
    const isValidation = validateForm();

    if (isValidation) {
      try {
        const response = await axios.post(`http://localhost:8082/api/v1/auth/sign-up`, userInfo);
        if (response.data) {
          navigate(SIGN_IN_PATH);
        } else {
          setErrors((prev) => ({
            ...prev,
            form: "회원가입에 실패했습니다.",
          }));
        }
      } catch {
        setErrors((prev) => ({
          ...prev,
          form: "서버 에러가 발생하였습니다.",
        }));
      }
    }
  };

  const validateForm = () => {
    let tempErrors: Errors = {};

    tempErrors.userId = userInfo.userId ? "" : "아이디를 입력하세요.";
    tempErrors.password = userInfo.password.length >= 8 ? "" : "비밀번호는 8자 이상이어야 합니다.";
    tempErrors.checkPassword = userInfo.checkPassword === userInfo.password ? "" : "비밀번호가 일치하지 않습니다.";
    tempErrors.name = userInfo.name ? "" : "이름을 입력하세요.";
    tempErrors.email = userInfo.email ? "" : "이메일을 입력하세요.";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  return (
    <Box css={css.container}>
        <Typography variant="h5" mb={2}>
          회원가입
        </Typography>

        <TextField
          placeholder="아이디"
          type="text"
          name="userId"
          variant="outlined"
          value={userInfo.userId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.userId}
          helperText={errors.userId}
          color="warning"
          css={css.inputStyle}
        />

        <TextField
          placeholder="비밀번호"
          type="password"
          name="password"
          variant="outlined"
          value={userInfo.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
          color="warning"
          css={css.inputStyle}
        />

        <TextField
          placeholder="비밀번호확인"
          type="password"
          name="checkPassword"
          variant="outlined"
          value={userInfo.checkPassword}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.checkPassword}
          helperText={errors.checkPassword}
          color="warning"
          css={css.inputStyle}
        />

        <TextField
          placeholder="이름"
          type="text"
          name="name"
          variant="outlined"
          value={userInfo.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
          color="warning"
          css={css.inputStyle}
        />

        <TextField
          placeholder="이메일"
          type="email"
          name="email"
          variant="outlined"
          value={userInfo.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
          color="warning"
          css={css.inputStyle}
        />

        {errors.form && (
          <Typography color="error" mt={2}>
            {errors.form}
          </Typography>
        )}
        <Button
          onClick={handleSignUp}
          fullWidth
          variant="contained"
          css={css.btnStyle}
        >
          가입하기
        </Button>
    </Box>
  );
}