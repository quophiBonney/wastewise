import React from 'react'
import trashcan from "@/assets/svgs/recycling.svg";
import Image from "next/image";
import Link from 'next/link';
const WhyDirty = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <Image src={trashcan} alt="" width={600} height={500} />
      </div>
      <div className="flex flex-col justify-center items-center space-y-6 md:space-y-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shadow-lg text-gray-900 lg:text-center">
          Why Keeping Surroundings Dirty?
        </h2>
        <p className="text-center">
          Keeping our surroundings dirty harms our health, pollutes the
          environment, and spoils the beauty of our neighborhood. Let’s take
          responsibility—dispose of waste properly, recycle when possible, and
          encourage others to do the same. Together, we can create a cleaner,
          healthier, and happier community. Act now for a better tomorrow!
        </p>
        <div className="flex flex-col md:flex-row md:w-auto gap-3">
          <Link href="/bin/centres"
            className="bg-green-600 text-white rounded-lg shadow-md px-3 p-3 w-60 hover:cursor-pointer flex justify-center items-center
          transition-colors duration-200 
           hover:opacity-90 hover:scale-105"
          >
            Find A Bin Near You 
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhyDirty