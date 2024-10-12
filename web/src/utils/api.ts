import axios from "axios";

export const api = axios.create({
  baseURL: "https://achieve-it-api-achieve-it.bswnrh.easypanel.host",
});

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
