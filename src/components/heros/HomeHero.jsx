import React from 'react'
import bin from '@/assets/images/bin-illustration.png'
import Image from 'next/image'
import Link from 'next/link';
const HomeHero = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col justify-center items-center space-y-6 md:space-y-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-shadow-lg text-gray-900">
          WASTE WISE
        </h1>
        <p className="text-center">
          Making our communities clean and disease-free. Join millions of
          Ghanaians making our cities and towns a beautiful and safe place to
          live in.
        </p>
        <div className="flex flex-col md:flex-row md:w-auto gap-3">
          <button className="bg-green-600 text-white rounded-lg shadow-md px-3 p-3 w-52">
            Get A Bin
          </button>
          <Link href="/bin-centres" className="flex justify-center border-2 border-green-600 text-green-500 rounded-lg shadow-md px-3 p-3 w-52">
           Explore Bin Centres
          </Link>
        </div>
      </div>
      <div>
        <Image src={bin} alt="" width={600} height={600} />
      </div>
    </section>
  );
}

export default HomeHero