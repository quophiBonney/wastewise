import PickupAreasCard from '@/components/cards/PickupAreasCard'
import BinCentresHero from '@/components/heros/BinCentresHero'
import React from 'react'

const page = () => {
  return (
    <div className="pt-24 md:pt-20 px-5 lg:px-10">
    <BinCentresHero/>
    <PickupAreasCard/>
    </div>
  )
}

export default page