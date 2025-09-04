import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const roleUser = {
  ADMIN: "QuanTri",
  USER: "KhachHang",
};

const AuthCheck = ({ children, isNeedLogin, pagePermission }) => {
  const { infoUser } = useSelector((state) => state.userSlice);
  const location = useLocation();

  // ✅ Các route public không bị ép redirect
  const PUBLIC_PATHS = ["/login", "/register"];

  // Chuẩn hóa role để phòng chữ hoa/thường
  const role = (infoUser?.maLoaiNguoiDung || "").toLowerCase();
  const isAdmin = role === "quantri";
  const isUser  = role === "khachhang";

  // 1) Nếu chưa đăng nhập mà route yêu cầu đăng nhập → đẩy về /login
  if (!infoUser && isNeedLogin) {
    return <Navigate to="/login" replace />;
  }

  // 2) Nếu đã đăng nhập, route KHÔNG cần đăng nhập → đá về trang chủ
  // (giữ nguyên hành vi cũ, tránh vào lại /login, /register khi đã login)
  if (infoUser && !isNeedLogin && !PUBLIC_PATHS.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  // 3) Admin mà đi vào ngoài /admin và KHÔNG thuộc public → đẩy về /admin
  if (infoUser && isAdmin
      && !location.pathname.startsWith("/admin")
      && !PUBLIC_PATHS.includes(location.pathname)) {
    return <Navigate to="/admin" replace />;
  }

  // 4) User thường mà vào trang cần quyền admin → đưa về trang chủ
  if (infoUser && isUser && pagePermission === roleUser.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <div>{children}</div>;
};

export default AuthCheck;
