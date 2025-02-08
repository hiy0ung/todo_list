import React, { useEffect } from 'react';
import '../App.css'

import { Route, Routes } from 'react-router-dom';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import UseAuthStore from '../stores/auth.store';
import Container from '../layouts/Container';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import { MAIN_PATH, MY_PAGE_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TODO_PATH } from '../constants';
import Todo from './TodoList';
import Main from './Main';
import MyPage from './MyPage/MyPage';

function Index() {
  const [cookies, setCookies, removeCookie] = useCookies(['token']);
  const { login, logout } = UseAuthStore();

  const fetchUserData = async () => {
    const token = cookies.token;

    if (token) {
      try {
        const response = await axios.get('http://localhost:8082/api/v1/my-page', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });


        if (response.status === 200) {
          setCookies('token', token, { path: '/'});
          const userData = response.data.data;
          return userData;
        }
      } catch (e) {
        console.error('Failed to fetch user data', e);
        removeCookie('token', { path: '/'});
      }
    }
  }

  //& checkToken 함수: 토큰의 유효성을 확인하는 비동기 함수
  const checkToken = async () => {
    const token = cookies.token;

    if (token) {
      try {
        const userData = await fetchUserData();
        login(userData);

        const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3일 후
        setCookies('token', token, { path: '/', expires: expiryDate});
      } catch (e) {
        console.error('토큰 유효성 확인 중 오류 발생');
        removeCookie('token', { path: '/'});
      }
    }
  }

  //# useEffect: 부수효과 #//
  // 컴포넌트가 처음 랜더링될 때 'checkToken' 함수를 호출하여 토큰 유효성을 확인
  useEffect(() => {
    checkToken();
  }, []);


  return (
    <>
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH} element={<Main />} />
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={MY_PAGE_PATH} element={<MyPage />} />
          <Route path={TODO_PATH} element={<Todo />} />
        </Route>
      </Routes>
    </>
  );
}

export default Index;