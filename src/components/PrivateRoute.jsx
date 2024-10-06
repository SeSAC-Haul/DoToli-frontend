import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from "./layout/Layout.jsx";

const PrivateRoute = () => {
  // TODO 인증 상태 확인 로직 보완 필요(토큰의 유효성을 서버에서 확인하는 방식)
  const isAuthenticated = !!localStorage.getItem('token'); // 토큰 존재 여부로 인증 상태 확인

  return isAuthenticated ? <Layout/> : <Navigate to="/signin" replace/>;
};

export default PrivateRoute;