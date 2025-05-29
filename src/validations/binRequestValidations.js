import { z } from "zod";

export const binRequestValidations = z.object({
  houseAddress: z
    .string()
    .regex(/^[A-Za-z]{1,2}\d-\d{3}-\d{4}$/, {
      message:
        "Invalid House Address: Use Your Ghana Post Address",
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
  contact: z.string().regex(/^0\d{9,14}$/, {
    message: "Invalid Phone Number: Must be 10 digits",
  }),
});
