import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
const SignupForm = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen">
      <div className="flex flex-col justify-center items-center px-5 lg:px-16">
        <p className="hidden lg:flex flex-row items-center mb-6 w-full text-gray-600 font-semibold">
          <MdOutlineKeyboardArrowLeft size={25} /> Go back to login page
        </p>
        <div className="w-full px-5 md:px-16 lg:px-0">
          <form className="space-y-3 md:space-y-5 w-full ">
            <div className="text-gray-800 mt-5 lg:mb-10">
              <h2 className="text-3xl font-bold ">Register</h2>
              <p>Enter your details to complete your registration!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="h-6"
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
            <div>
              <input
                type="submit"
                value="Sign Up"
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
              />
            </div>
          </form>
          <div className="text-gray-800 mb-5 mt-5">
            <p>
              Already have an account? <Link href="/auth/signin">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden signup-right-col-bg lg:flex flex-col justify-center items-center text-gray-300">
        <p>Complete your registration in a seamless way.</p>
      </div>
    </section>
  );
};

export default SignupForm;
