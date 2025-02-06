/** @jsxImportSource @emotion/react */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../constants';
import * as css from './style'

export default function Main() {
  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate(SIGN_UP_PATH);
  }

  const handleNavigateSignIp = () => {
    navigate(SIGN_IN_PATH);
  }
  return (
    <div css={css.btnContainer}>
      <button onClick={handleNavigateSignIp} css={css.authBtn}>
        로그인
      </button>
      <button onClick={handleNavigateSignUp} css={css.authBtn}>
        회원가입
      </button>
    </div>
  )
}