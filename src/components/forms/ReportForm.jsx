import React from 'react'
import report from '@/assets/svgs/report.svg'
import Image from 'next/image';
const ReportForm = () => {
  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
      <div>
       <Image src={report} width={500} height={500} alt="printer bro svg"/>
      </div>
      <div className="shadow-lg bg-white p-5 rounded">
        <form className="space-y-4">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
            />
          </div>
          <div>
            <label htmlFor="issue type">Issue Type</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20">
              <option value="" disabled>
                Issue Type
              </option>
              <option value="">Stolen/Missing Bin</option>
              <option value="">Delayed Bin</option>
              <option value="">Personal Question</option>
              <option value="">Remark</option>
            </select>
          </div>
          <div>
            <label htmlFor="issueMessage">Message</label>
            <textarea
              placeholder="How may we help you?"
              className="w-full h-36 p-3 border border-gray-300 rounded-lg focus:outline-teal-500/20"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Send Report"
              className="w-full p-3 bg-green-600 hover:bg-green-500 text-white rounded-md cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportForm