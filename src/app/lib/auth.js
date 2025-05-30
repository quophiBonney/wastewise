// // lib/auth.js
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";

// // Sign a payload into a JWT (expires in 1 day)
// export function signToken(payload) {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
// }

// // Verify a JWT, throws if invalid or expired
// export function verifyToken(token) {
//   return jwt.verify(token, JWT_SECRET);
// }
