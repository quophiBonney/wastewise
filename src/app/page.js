import WhyDirty from '@/components/cards/WhyDirty'
import HomeHero from '@/components/heros/HomeHero'
import React from 'react'

const page = () => {
  return (
    <>
   <div className="pt-24 md:pt-16 px-5 lg:px-10">
    <HomeHero/>
    <WhyDirty/>
   </div>
    </>
  )
}

export default page