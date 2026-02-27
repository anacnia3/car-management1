import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CarPayload } from "@/features/auth/types/cars.types";

export function useCreateCarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CarPayload) => api.post("/cars", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useUpdateCarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: CarPayload }) =>
      api.put(`/cars/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useDeleteCarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => api.delete(`/cars/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

