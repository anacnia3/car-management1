import * as z from "zod";

const yearSchema = z.preprocess(
  (value) => (value === "" || value === null || Number.isNaN(value) ? undefined : value),
  z.unknown(),
)
  .refine((value) => value !== undefined, "validation.yearRequired")
  .refine((value) => typeof value === "number" && Number.isFinite(value), "validation.yearInvalid")
  .refine((value) => Number.isInteger(value), "validation.yearInvalid")
  .refine(
    (value) => typeof value === "number" && value >= 1886 && value <= new Date().getFullYear() + 1,
    "validation.yearInvalid",
  )
  .transform((value) => value as number);

export const carFormSchema = z.object({
  brand: z.string().min(2, "validation.brandRequired"),
  model: z.string().min(2, "validation.modelRequired"),
  color: z.string().min(2, "validation.colorRequired"),
  year: yearSchema,
});

export const createCarSchema = z.object({
  model: z.string().min(2, "validation.required"),
  brand: z.string().min(2, "validation.required"),
  color: z.string().min(2, "validation.required"),
  year: yearSchema,
});

export type CarFormData = z.infer<typeof carFormSchema>;
export type CreateCarFormData = z.infer<typeof createCarSchema>;
export type CarFormInput = z.input<typeof carFormSchema>;
export type CreateCarFormInput = z.input<typeof createCarSchema>;
