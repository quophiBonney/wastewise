const z = require('zod')

const registrationValidations = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().regex(/^\+\d{10,15}$/),
  role: z.enum(["user", "driver", "admin"]),
  password: z.string().min(8),
  region: z.string(),
  town: z.string(),
});

module.exports = registrationValidations