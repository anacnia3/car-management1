import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "validation.nameRequired")
      .min(3, "validation.nameMin"),
    email: z
      .string()
      .trim()
      .min(1, "validation.emailRequired")
      .email("validation.emailInvalid"),
    password: z
      .string()
      .min(1, "validation.passwordRequired")
      .min(6, "validation.passwordMin"),
    confirmPassword: z
      .string()
      .min(1, "validation.confirmPasswordRequired"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordsDoNotMatch",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;

