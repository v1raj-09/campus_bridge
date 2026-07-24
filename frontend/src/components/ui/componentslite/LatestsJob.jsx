import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCards from "./JobCards";
import { getJobData } from "./JobData.js";
import { Bookmark, Briefcase, MapPin, Building2, User } from "lucide-react";

const LatestsJob = ({ searchTerm = "" }) => {
  const navigate = useNavigate();
  const [allJobs] = useState(getJobData());
  const [showAll, setShowAll] = useState(false);

  // 🎨 CampusBridge Brand Colors (Dark Professional Blue)
  const primaryBlue = "bg-[#1E40AF]";
  const hoverBlue = "hover:bg-[#1D4ED8]";
  const textBlue = "text-[#1E3A8A]";
  const textDark = "text-[#111827]";

  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    job.alumni.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const jobsToShow = showAll ? filteredJobs : filteredJobs.slice(0, 9);

  const handleApplyClick = (jobId) => navigate(`/apply/${jobId}`);

  return (
    <section className="max-w-7xl mx-auto my-12 sm:my-20 md:my-24 px-3 sm:px-6 md:px-8 bg-gray-50/70 py-8 sm:py-16 rounded-3xl">
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-10 sm:mb-16 ${textDark} tracking-tight px-4`}>
        Latest & <span className={textBlue}>Top Job Openings</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {jobsToShow.length > 0 ? (
          jobsToShow.map((job) => (
            <div
              key={job.id}
              onClick={() => handleApplyClick(job.id)}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 flex flex-col cursor-pointer border border-gray-100"
            >
              {/* Job Type Tag and Bookmark */}
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wider sm:tracking-widest flex items-center gap-1 bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full">
                  <Briefcase className={`h-3 w-3 ${textBlue} flex-shrink-0`} /> {job.type}
                </div>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className={`p-1.5 rounded-full text-gray-400 hover:${textBlue} hover:bg-blue-50 transition`}
                >
                  <Bookmark className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Company Logo & Alumni */}
              <div className="flex items-center gap-3 mb-3 sm:mb-4 border-b border-gray-100 pb-3 sm:pb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${primaryBlue} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-left flex-grow min-w-0">
                  <h3 className="font-extrabold text-sm sm:text-lg text-gray-900 leading-snug truncate">{job.company}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                    <User className="h-3 w-3 text-gray-400 flex-shrink-0" /> <span className="truncate">Posted By: {job.alumni}</span>
                  </p>
                </div>
              </div>

              <div className="flex-grow min-h-[40px] sm:min-h-[50px] mb-3 sm:mb-4">
                <JobCards job={job} />
              </div>

              {/* LOCATION & CTA BUTTON */}
              <div className="flex justify-between items-center mt-auto pt-3 sm:pt-4 border-t border-gray-100 gap-2">
                <p className="text-xs sm:text-base font-semibold text-gray-600 flex items-center gap-1 truncate">
                  <MapPin className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${textBlue} flex-shrink-0`} /> <span className="truncate">{job.location}</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyClick(job.id);
                  }}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl ${primaryBlue} text-white font-semibold ${hoverBlue} transition-all duration-300 text-xs sm:text-sm shadow-md shadow-blue-500/30 flex-shrink-0`}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-base sm:text-xl py-12 border-t border-b border-gray-200 bg-white rounded-2xl shadow-sm px-4">
            No jobs found matching “{searchTerm.trim()}”
          </p>
        )}
      </div>

      {filteredJobs.length > 9 && (
        <div className="mt-10 sm:mt-16 text-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className={`w-full sm:w-auto text-white ${primaryBlue} px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-semibold text-base sm:text-lg ${hoverBlue} transition-all duration-300 shadow-xl shadow-blue-500/30`}
            >
              View All Jobs ({filteredJobs.length})
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="w-full sm:w-auto text-gray-700 border border-gray-300 bg-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default LatestsJob;