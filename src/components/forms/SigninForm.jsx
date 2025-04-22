import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
const SigninForm = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen">
      <div className="flex flex-col justify-center items-center px-5 md:px-10 lg:px-16">
        <p className="flex flex-row items-center mb-6 w-full text-gray-600 font-semibold">
          <MdOutlineKeyboardArrowLeft size={25} /> Go back to signup page
        </p>
        <div className="w-full">
          <form className="space-y-3 md:space-y-5 w-full ">
            <div className="text-gray-800 mb-10">
              <h2 className="text-3xl font-bold ">Login</h2>
              <p>Enter your details to log into your account!</p>
            </div>
            <div className="">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Sign In"
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
              />
            </div>
          </form>
          <div className="text-gray-800 mb-5 mt-5">
            <p>Don't have account yet? Signup</p>
          </div>
        </div>
      </div>
      <div className="signup-right-col-bg flex flex-col justify-center items-center text-gray-300">
        <h2 className="text-3xl font-bold ">Welcome Back!</h2>
        <p>Log into your account.</p>
      </div>
    </section>
  );
};

export default SigninForm;
