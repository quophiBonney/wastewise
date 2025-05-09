import React from 'react'
import { GrDirections } from "react-icons/gr";
const PickupAreasCard = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
      <div className="shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition-shadow duration-300 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Pick Point: Accra
          </h3>
          <p className="text-gray-600">City/Town: Shiashie</p>
          <p className="text-gray-600">Driver: Quophi Clef</p>
        </div>
        <div>
          <button className="bg-green-600 text-white rounded p-3 mt-2 text-sm  hover:text-gray-800">
            Get Direction
          </button>
        </div>
      </div>
      <div className="shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition-shadow duration-300 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Pick Point: Accra
          </h3>
          <p className="text-gray-600">City/Town: Shiashie</p>
          <p className="text-gray-600">Driver: Quophi Clef</p>
        </div>
        <div>
          <button className="bg-green-600 text-white rounded p-3 mt-2 text-sm  hover:text-gray-800 flex items-center gap-3">
           <GrDirections/> Get Direction
          </button>
        </div>
      </div>
      <div className="shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition-shadow duration-300 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Pick Point: Accra
          </h3>
          <p className="text-gray-600">City/Town: Shiashie</p>
          <p className="text-gray-600">Driver: Quophi Clef</p>
        </div>
        <div>
          <button className="bg-green-600 text-white rounded p-3 mt-2 text-sm  hover:text-gray-800">
            Get Direction
          </button>
        </div>
      </div>
      <div className="shadow-md rounded-lg p-5 bg-white hover:shadow-lg transition-shadow duration-300 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Pick Point: Accra
          </h3>
          <p className="text-gray-600">City/Town: Shiashie</p>
          <p className="text-gray-600">Driver: Quophi Clef</p>
        </div>
        <div>
          <button className="bg-green-600 text-white rounded p-3 mt-2 text-sm  hover:text-gray-800">
            Get Direction
          </button>
        </div>
      </div>
    </section>
  );
}

export default PickupAreasCard