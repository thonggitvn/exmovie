import axios from "axios";
import { localStorageUtil, keysLocalStorage } from "../util/localStorage";

const BASE_URL = "https://movienew.cybersoft.edu.vn/api";

// ✅ DÙNG token 
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NSIsIkhldEhhblN0cmluZyI6IjExLzAyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3MDc2ODAwMDAwMCIsIm5iZiI6MTc0MzAxMjAwMCwiZXhwIjoxNzcwOTE5MjAwfQ._5a1o_PuNL8CuHuGdsi1TABKYJwuMsnG5uSKAILfaY8";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// ✅ Chỉ gắn Authorization khi có accessToken (đã login)
instance.interceptors.request.use((config) => {
  const token = localStorageUtil.get(keysLocalStorage.INFO_USER)?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // tránh Bearer undefined gây 401
  }
  return config;
});

export const axiosCustom = instance;
