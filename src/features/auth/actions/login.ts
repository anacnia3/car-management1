import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { LoginFormData } from "../schemas/login.schema";

type ApiError = { message?: string };

export async function login(data: LoginFormData) {
  try {
    const response = await api.post("/auth/login", data);
    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }

    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiError>;
    const errorMessage = axiosError.response?.data?.message || "messages.invalidCredentials";
    throw new Error(errorMessage);
  }
}
