import axios from "axios";

export const api = axios.create({
  // URL do seu IntelliJ + prefixo do seu Controller
  baseURL: "http://localhost:8080/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para anexar o Token JWT em todas as requisições futuras
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});