import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobData } from "./JobData.js";
import { ArrowLeft, Send } from "lucide-react";

const ApplicationFormPlaceholder = ({ jobId }) => {
  const primaryBlue = "bg-[#1E40AF]";
  const textBlue = "text-[#1E3A8A]";

  return (
    <div className="border border-blue-300 bg-blue-50 p-6 rounded-lg mt-6">
      <h2 className={`text-2xl font-bold ${textBlue} mb-4 flex items-center gap-2`}>
        <Send className={`h-5 w-5 ${textBlue}`} /> Application for Job ID: {jobId}
      </h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-md focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]" required />
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]" required />
        </div>
        <input type="tel" placeholder="Phone Number" pattern="[0-9]{10}" className="w-full p-3 border rounded-md focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]" required />
        <textarea placeholder="Cover Letter (Optional)" rows="4" className="w-full p-3 border rounded-md focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"></textarea>

        <div className="border border-gray-300 p-4 rounded-md bg-white">
          <label className="block text-gray-700 font-semibold mb-2">Upload Resume (PDF only)</label>
          <input type="file" accept=".pdf" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1E40AF]/10 file:text-[#1E40AF] hover:file:bg-[#1E40AF]/20 transition" />
        </div>

        <button type="submit" className={`w-full ${primaryBlue} text-white py-3 px-6 rounded-lg hover:bg-[#1D4ED8] transition font-semibold shadow-md`}>
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

  const job = allJobs.find((job) => job.id === parseInt(id));
  if (!job) return <p className="text-center mt-10 text-gray-500">Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-2xl border border-gray-100">
      <button onClick={() => navigate(-1)} className={`mb-6 ${textBlue} font-semibold hover:underline flex items-center gap-1 transition`}>
        <ArrowLeft className="h-4 w-4" /> Back to Job Listings
      </button>

      {showApplyForm ? (
        <ApplicationFormPlaceholder jobId={id} />
      ) : (
        <>
          <h1 className="text-3xl font-extrabold mb-3 text-gray-900">{job.title}</h1>
          <div className="border-b pb-3 mb-4">
            <p className="text-xl font-bold text-gray-700">{job.company}</p>
            <p className="text-lg text-gray-600 font-medium">{job.location}</p>
          </div>

          <p className="mb-6 text-gray-700 leading-relaxed border-b pb-4">{job.description}</p>

          <h2 className={`text-xl font-semibold mb-3 mt-4 ${textBlue}`}>Key Details</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-2 text-gray-800">
            <p><span className="font-semibold text-gray-600">Positions:</span> {job.positions}</p>
            <p><span className="font-semibold text-gray-600">Salary:</span> {job.salary}</p>
            <p><span className="font-semibold text-gray-600">Mode:</span> {job.mode}</p>
            <p><span className="font-semibold text-gray-600">Type:</span> {job.type}</p>
            <p className="col-span-2"><span className="font-semibold text-gray-600">Experience:</span> {job.experience}</p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setShowApplyForm(true)}
              className={`${primaryBlue} text-white py-3 px-8 rounded-lg hover:bg-[#1D4ED8] transition font-extrabold shadow-lg shadow-blue-500/40`}
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
