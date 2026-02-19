import { api } from "@/lib/api";
import { LoginFormData } from "../schemas/login.schema";

export async function login(data: LoginFormData) {
  try {
    // Chamada para o endpoint /api/v1/auth/login
    const response = await api.post("/auth/login", data);
    
    // O seu Java retorna um objeto JwtToken { token: "string" }
    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }

    return response.data;
  } catch (error: any) {
    // Captura erros do Spring Boot (ex: 401 Unauthorized)
    const errorMessage = error.response?.data?.message || "Invalid credentials";
    throw new Error(errorMessage);
  }
}