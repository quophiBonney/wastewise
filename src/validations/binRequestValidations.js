import { z } from "zod";

export const binRequestValidations = z.object({
  houseAddress: z
    .string()
    .regex(/^[A-Za-z]{2}-\d{3}-\d{4}$/, {
      message:
        "Invalid format: expected two letters, dash, three digits, dash, four digits.",
    })
    .transform((str) => str.toUpperCase().trim()),

  region: z
    .string()
    .min(1, { message: "Region is required" })
    .transform((s) => s.trim()),

  town: z
    .string()
    .min(1, { message: "Town is required" })
    .transform((s) => s.trim()),

  houseHoldSize: z.string(),

  contact: z.string().regex(/^\+\d{10,15}$/, {
    message: "Invalid number: Please start with country code (e.g. +233)",
  }),
});
