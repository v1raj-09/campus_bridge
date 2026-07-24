import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobData } from "./JobData.js";
import { ArrowLeft, Send } from "lucide-react";

const ApplicationFormPlaceholder = ({ jobId }) => {
  const primaryBlue = "bg-[#1E40AF]";
  const textBlue = "text-[#1E3A8A]";

  return (
    <div className="border border-blue-300 bg-blue-50 p-4 sm:p-6 md:p-8 rounded-2xl mt-6">
      <h2 className={`text-xl sm:text-2xl font-bold ${textBlue} mb-4 flex items-center gap-2 flex-wrap`}>
        <Send className={`h-5 w-5 ${textBlue} flex-shrink-0`} /> 
        <span>Application for Job ID: {jobId}</span>
      </h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-3 bg-white text-sm sm:text-base border rounded-xl focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] outline-none" 
            required 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 bg-white text-sm sm:text-base border rounded-xl focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] outline-none" 
            required 
          />
        </div>
        <input 
          type="tel" 
          placeholder="Phone Number" 
          pattern="[0-9]{10}" 
          className="w-full p-3 bg-white text-sm sm:text-base border rounded-xl focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] outline-none" 
          required 
        />
        <textarea 
          placeholder="Cover Letter (Optional)" 
          rows="4" 
          className="w-full p-3 bg-white text-sm sm:text-base border rounded-xl focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF] outline-none resize-y"
        ></textarea>

        <div className="border border-gray-300 p-4 rounded-xl bg-white">
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Upload Resume (PDF only)</label>
          <input 
            type="file" 
            accept=".pdf" 
            required 
            className="w-full text-xs sm:text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-[#1E40AF]/10 file:text-[#1E40AF] hover:file:bg-[#1E40AF]/20 transition cursor-pointer" 
          />
        </div>

        <button 
          type="submit" 
          className={`w-full ${primaryBlue} text-white py-3 px-6 rounded-xl hover:bg-[#1D4ED8] transition font-semibold shadow-md text-sm sm:text-base`}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

const JobDetail = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const allJobs = getJobData();
  const { id } = useParams();
  const navigate = useNavigate();

  const primaryBlue = "bg-[#1E40AF]";
  const textBlue = "text-[#1E3A8A]";

  // Updated to support string/number ID matching based on latest JobData format changes
  const job = allJobs.find((job) => String(job.id) === String(id));
  if (!job) return <p className="text-center mt-12 text-gray-500 text-base sm:text-lg">Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto my-6 sm:my-10 mx-4 sm:mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <button 
        onClick={() => navigate(-1)} 
        className={`mb-6 ${textBlue} font-semibold hover:underline flex items-center gap-1 transition text-sm sm:text-base`}
      >
        <ArrowLeft className="h-4 w-4 flex-shrink-0" /> Back to Job Listings
      </button>

      {showApplyForm ? (
        <ApplicationFormPlaceholder jobId={id} />
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-tight">{job.title}</h1>
          <div className="border-b pb-3 mb-4">
            <p className="text-lg sm:text-xl font-bold text-gray-700">{job.company}</p>
            <p className="text-base sm:text-lg text-gray-600 font-medium">{job.location}</p>
          </div>

          <p className="mb-6 text-gray-700 text-sm sm:text-base leading-relaxed border-b pb-4">{job.description}</p>

          <h2 className={`text-lg sm:text-xl font-semibold mb-3 mt-4 ${textBlue}`}>Key Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-8 mt-2 text-gray-800 text-sm sm:text-base">
            <p><span className="font-semibold text-gray-600">Positions:</span> {job.positions}</p>
            <p><span className="font-semibold text-gray-600">Salary:</span> {job.salary}</p>
            <p><span className="font-semibold text-gray-600">Mode:</span> {job.mode}</p>
            <p><span className="font-semibold text-gray-600">Type:</span> {job.type}</p>
            <p className="sm:col-span-2"><span className="font-semibold text-gray-600">Experience:</span> {job.experience}</p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setShowApplyForm(true)}
              className={`w-full sm:w-auto ${primaryBlue} text-white py-3.5 px-8 rounded-xl hover:bg-[#1D4ED8] transition font-extrabold shadow-lg shadow-blue-500/30 text-base`}
            >
              Apply Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetail;