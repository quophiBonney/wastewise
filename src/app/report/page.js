import ReportForm from '@/components/forms/ReportForm'
import ReportHero from '@/components/heros/ReportHero'
import React from 'react'

const page = () => {
  return (
    <div className="pt-24 md:pt-16 px-5 lg:px-10">
    <ReportHero/>
    <ReportForm/>
    </div>
  )
}

export default page