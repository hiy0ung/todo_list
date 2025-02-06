import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoList from "./views/TodoList";
import MyPage from "./views/myPage/MyPage";
import Main from "./views/Main";
import SignIn from "./views/Authentication/SignIn";
import { MAIN_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TODO_PATH } from "./constants";
import SignUp from "./views/Authentication/SignUp";

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Routes>
        <Route path={MAIN_PATH} element={<Main />} />
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route path={SIGN_UP_PATH} element={<SignUp />} />
        <Route path={TODO_PATH} element={<TodoList />} />
        {/* <Route path='/' element= { <MyPage /> } /> */}
      </Routes>
    </div>
  );
}
