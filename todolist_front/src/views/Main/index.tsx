/** @jsxImportSource @emotion/react */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_PATH, SIGN_UP_PATH, TODO_PATH } from '../../constants';
import * as css from './style'
import { useCookies } from 'react-cookie';

export default function Main() {
  const [cookies, ] = useCookies(['token']);
  const token = cookies.token;
  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate(SIGN_UP_PATH);
  }

  const handleNavigateSignIp = () => {
    navigate(SIGN_IN_PATH);
  }

  const handleNavigateTodo = () => {
    navigate(TODO_PATH);
  }
  return (
    <>
      {!token ? (
        <div css={[css.btnContainer, { zIndex: 1 }]}>
          <button onClick={handleNavigateSignIp} css={css.authBtn}>
            로그인
          </button>
          <button onClick={handleNavigateSignUp} css={css.authBtn}>
            회원가입
          </button>
        </div>
      ) : (
        <div css={css.btnContainer}>
          <button onClick={handleNavigateTodo} css={css.authBtn}>
            Todo-List
          </button>
        </div>
      )}
    </>
  );
}