"use client"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { loginUser } from "@/slice/authSlice";
const SigninForm = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData((prevData) => ({...prevData, [name]: value}))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen">
      <div className="flex flex-col justify-center items-center px-5 lg:px-16">
        <div className="w-full px-5 md:px-16 lg:px-0">
          <form className="space-y-3 md:space-y-5 w-full" onSubmit={handleSubmit}>
            <div className="text-gray-800 mb-10">
              <p className="hidden lg:flex flex-row items-center mb-6 w-full text-gray-600 font-semibold">
                <MdOutlineKeyboardArrowLeft size={25} />{" "}
                <Link href="/auth/signup">Go to signup page</Link>
              </p>
              <h2 className="text-3xl font-bold ">Login</h2>
              <p>Enter your details to log into your account!</p>
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                required
              />
            </div>
            <div className="">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className="w-full p-3 bg-green-600 hover:bg-green-500 text-white rounded-md cursor-pointer"
              />
            </div>
          </form>
          <div className="text-gray-800 mb-5 mt-5">
            <p>
              Don't have an account yet? <Link href="/auth/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-green-600 lg:flex flex-col justify-center items-center text-gray-300">
        <p className="text-lg">Welcome Back</p>
        <h3 className="text-5xl font-bold uppercase">WasteWise</h3>
      </div>
    </section>
  );
};

export default SigninForm;
