// Jobs.jsx (LatestJobs style Apply Form flow)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterCards from "./FilterCards.jsx";
import JobCards from "./JobCards.jsx";
import { getJobData } from "./JobData.js"; 
import { SlidersHorizontal, Bookmark, Briefcase, MapPin, Building2, User } from "lucide-react";

const Jobs = () => {
    const navigate = useNavigate();
    const [allJobs] = useState(getJobData());

    // 🌟 Theme Colors
    const primaryBlue = "bg-[#1E40AF]";
    const hoverBlue = "hover:bg-[#1D4ED8]";
    const textBlue = "text-[#1E3A8A]";
    const textDark = "text-[#111827]";

    // Filters
    const [selectedFilters, setSelectedFilters] = useState({
        location: "",
        industry: "",
        experience: "",
        salary: "",
    });

    const filteredJobs = allJobs.filter((job) => {
        const locationMatch = selectedFilters.location ? job.location === selectedFilters.location : true;
        const industryMatch = selectedFilters.industry ? job.industry === selectedFilters.industry : true;
        const experienceMatch = selectedFilters.experience ? job.experience === selectedFilters.experience : true;
        const salaryMatch = selectedFilters.salary ? job.salary === selectedFilters.salary : true;
        return locationMatch && industryMatch && experienceMatch && salaryMatch;
    });

    const totalJobs = filteredJobs.length;

    // 🌟 Apply Click - Navigate to Apply Form page (LatestJobs style)
    const handleApplyClick = (job) => {
        const user = JSON.parse(localStorage.getItem("user"));
        navigate(`/apply/${job.id}`, { state: { job, user } });
    };

    return (
        <div className="max-w-7xl mx-auto my-12 px-4 md:px-8 flex gap-8 bg-gray-50/70 py-8">
            {/* Left Filter Sidebar */}
            <div className="w-1/4 flex-shrink-0">
                <div className="sticky top-10 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <h2 className="text-[20px] font-bold text-gray-800 flex items-center gap-2">
                            <SlidersHorizontal className={`h-5 w-5 ${textBlue}`} /> Job Filters
                        </h2>
                        <button
                            className={`text-sm ${textBlue} hover:underline transition`}
                            onClick={() =>
                                setSelectedFilters({ location: "", industry: "", experience: "", salary: "" })
                            }
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="max-h-[75vh] overflow-y-auto pr-2">
                        <FilterCards
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />
                    </div>
                </div>
            </div>

            {/* Right Job Cards Section */}
            <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-700 mb-6 tracking-tight">
                    Showing <span className={`font-extrabold ${textBlue}`}>{totalJobs}</span> matching job(s)
                </h3>

                <div className="h-[80vh] overflow-y-auto pr-2 pb-5">
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="relative bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 p-5 flex flex-col cursor-pointer border border-gray-100"
                                >
                                    {/* Job Type + Bookmark */}
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-[11px] font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1 bg-blue-100/60 px-3 py-1 rounded">
                                            <Briefcase className={`h-3.5 w-3.5 ${textBlue}`} /> {job.type}
                                        </div>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className={`p-1 rounded-full text-gray-400 hover:${textBlue} transition`}
                                        >
                                            <Bookmark className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Company Info */}
                                    <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-3">
                                        <div
                                            className={`w-11 h-11 ${primaryBlue} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}
                                        >
                                            <Building2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-left flex-grow">
                                            <h3 className="font-bold text-[16px] text-gray-900 leading-snug">
                                                {job.company}
                                            </h3>
                                            <p className="text-[12px] text-gray-500 flex items-center gap-1 mt-0.5">
                                                <User className="h-3 w-3 text-gray-400" /> Posted By: {job.alumni}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Job Details Card */}
                                    <div className="flex-grow min-h-[45px] mb-3">
                                        <JobCards job={job} />
                                    </div>

                                    {/* Footer: Location & Apply Button */}
                                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                                        <p className="text-[13.5px] font-semibold text-gray-600 flex items-center gap-1">
                                            <MapPin className={`h-4 w-4 ${textBlue}`} /> {job.location}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleApplyClick(job);
                                            }}
                                            className={`px-5 py-2 rounded-lg ${primaryBlue} text-white font-semibold ${hoverBlue} transition-all duration-300 text-sm shadow-md shadow-blue-500/30`}
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-20 border-t border-gray-200 mt-5 bg-white rounded-xl shadow-sm">
                            <p className="text-[18px] font-medium">No jobs found matching your criteria.</p>
                            <p className="text-[15px] mt-2">Try adjusting your filter selections.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
