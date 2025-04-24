import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
const SigninForm = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen">
      <div className="flex flex-col justify-center items-center px-5 lg:px-16">
        <p className="hidden lg:flex flex-row items-center mb-6 w-full text-gray-600 font-semibold">
          <MdOutlineKeyboardArrowLeft size={25} />{" "}
          <Link href="/">Go back to login page</Link>
        </p>
        <div className="w-full px-5 md:px-16 lg:px-0">
          <form className="space-y-3 md:space-y-5 w-full ">
            <div className="text-gray-800 mb-10">
              <h2 className="text-3xl font-bold ">Login</h2>
              <p>Enter your details to log into your account!</p>
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
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
      <div className="hidden signup-right-col-bg lg:flex flex-col justify-center items-center text-gray-300">
        <p>Welcome Back</p>
      </div>
    </section>
  );
};

export default SigninForm;
