import React from 'react'
const PickupAreasCard = () => {
  return (
    <section className="mt-20 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
      <div className="shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition-shadow duration-300 space-y-3 text-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="shadow-lg border border-green-500 rounded-full p-4 text-2xl text-green-500 font-semibold w-16 h-16 flex items-center justify-center">
            01
          </h3>
          <h2 className="text-xl font-bold text-gray-800 mt-5">
            Choose/Select Your Region
          </h2>
          <p>You can your region out of the sixteen(16) regions in Ghana. Without selecting your region, you can't select town/city</p>
        </div>
      </div>
      <div className="shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition-shadow duration-300 space-y-3 text-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="shadow-lg border border-green-500 rounded-full p-4 text-2xl text-green-500 font-semibold w-16 h-16 flex items-center justify-center">
            02
          </h3>
          <h2 className="text-xl font-bold text-gray-800 mt-5">
            Choose/Select Your Town/City
          </h2>
          <p>Once you select your region, all the cities and towns under the region becomes available to be selected.</p>
        </div>
      </div>
      <div className="shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition-shadow duration-300 space-y-3 text-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="shadow-lg border border-green-500 rounded-full p-4 text-2xl text-green-500 font-semibold w-16 h-16 flex items-center justify-center">
            03
          </h3>
          <h2 className="text-xl font-bold text-gray-800 mt-5">
           Click/Tap On Find Nearest Bin Centre
          </h2>
          <p>Finally, the list of bin pickup centres shows right after. You can view the real-time location of the centre.</p>
        </div>
      </div>
    </section>
  );
}

export default PickupAreasCard