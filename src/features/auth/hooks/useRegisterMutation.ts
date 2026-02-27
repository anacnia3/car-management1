import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => api.post("/auth/register", payload),
  });
}

