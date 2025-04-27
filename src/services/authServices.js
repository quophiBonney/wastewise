const { NextApiRequest, NextApiResponse } = require("next");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/Users");
const registrationValidations = require('@/validations/userRegistration'); 
const dotenv = require("dotenv");
  dotenv.config()
const registerUser = async (NextApiRequest, NextApiResponse) => {
     if (req.method !== "POST") {
       res.setHeader("Allow", ["POST"]);
       return res.status(405).end(`Method ${req.method} Not Allowed`);
     }
     let data;
     try {
       data = registrationValidations.parse(req.body);
     } catch (err) {
       return res
         .status(400)
         .json({ error: "Invalid input", details: err.errors });
     }
  const { fullName, email, role, phone, password, region, town } = data
  try {
     const [byEmail, byPhone] = await Promise.all([
       UserModel.findOne({ email }),
       UserModel.findOne({ phone }),
     ]);
     if (byEmail || byPhone) {
       // don’t reveal which one exists
       return res
         .status(409)
         .json({ error: "User with those credentials already exists" });
     }
     const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({
      fullName,
      email,
      role,
      phone,
     password: passwordHashed,
      region,
      town,
    })

    // 8) Generate JWT & set secure, httpOnly cookie
    const token = sign(
      { sub: newUser._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )
    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 2 * 60 * 60,       // 2 hours
    }))
      // 9) Return minimal user info
    return res.status(201).json({ message: 'Registered', user: { id: newUser._id, fullName, email, role } })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}
