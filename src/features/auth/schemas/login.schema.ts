import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("messages.invalidEmail"),
  password: z.string().min(6, "messages.passwordTooShort"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
