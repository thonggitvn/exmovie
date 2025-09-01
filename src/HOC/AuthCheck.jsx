import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// import { roleUser } from "../routers";

export const roleUser = {
  ADMIN: "quanTri",
  USER: "KhachHang",
};
const AuthCheck = ({ children, isNeedLogin, pagePermission }) => {
  const { infoUser } = useSelector((state) => state.userSlice);

  const localtion = useLocation();

  
  if (
    infoUser?.maLoaiNguoiDung === roleUser.ADMIN &&
    infoUser &&
    !localtion.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin" replace />;
  }

  if (
    infoUser?.maLoaiNguoiDung === roleUser.USER &&
    infoUser &&
    pagePermission === roleUser.ADMIN
  ) {
    return <Navigate to="/" replace />;
  }

  
  if (infoUser && !isNeedLogin) {
    return <Navigate to="/" replace />;
  }


  if (!infoUser && isNeedLogin) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
};

export default AuthCheck;
