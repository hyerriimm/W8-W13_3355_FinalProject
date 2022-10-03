
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_HOST_PORT,
});

instance.interceptors.request.use((config) => {
  // const token = localStorage.setItem("ACCESS_TOKEN");
  // const refreshToken = localStorage.setItem("REFRESH_TOKEN");

  // config.headers.authorization = token;
  // config.headers.refreshtoken = refreshToken;

  const ACCESS_TOKEN = config.headers.authorization;
  const REFRESH_TOKEN = config.headers.refreshtoken;
  localStorage.setItem("token", ACCESS_TOKEN); //로컬스토리지에 토큰저장
  localStorage.setItem("refresh", REFRESH_TOKEN); //로컬스토리지에 토큰저장

  return config;
});