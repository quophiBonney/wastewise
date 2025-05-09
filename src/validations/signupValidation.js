import z from 'zod'

export const registrationValidations = z.object({
  fullName: z.string(),
  email: z.string().email(),
  role: z.enum(["user", "driver", "admin"]),
  password: z.string().min(8),
  region: z.string(),
  town: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

