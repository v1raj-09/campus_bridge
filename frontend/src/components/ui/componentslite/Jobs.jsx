// Jobs.jsx (LatestJobs style Apply Form flow - Fully Responsive)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterCards from "./FilterCards.jsx";
import JobCards from "./JobCards.jsx";
import { getJobData } from "./JobData.js"; 
import { SlidersHorizontal, Bookmark, Briefcase, MapPin, Building2, User, X } from "lucide-react";

const Jobs = () => {
    const navigate = useNavigate();
    const [allJobs] = useState(getJobData());
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // 🌟 Theme Colors
    const primaryBlue = "bg-[#1E40AF]";
    const hoverBlue = "hover:bg-[#1D4ED8]";
    const textBlue = "text-[#1E3A8A]";

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

    // 🌟 Apply Click - Navigate to Apply Form page
    const handleApplyClick = (job) => {
        const user = JSON.parse(localStorage.getItem("user"));
        navigate(`/apply/${job.id}`, { state: { job, user } });
    };

    return (
        <div className="max-w-7xl mx-auto my-6 sm:my-12 px-3 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8 bg-gray-50/70 py-4 sm:py-8">
            
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-base font-bold text-gray-800">Filter Job Listings</h3>
                <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${primaryBlue} text-white text-sm font-semibold shadow-md`}
                >
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
            </div>

            {/* Mobile Filter Overlay & Drawer */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-sm animate-fadeIn">
                    <div className="w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col overflow-y-auto ml-auto">
                        <div className="flex items-center justify-between border-b pb-4 mb-4">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <SlidersHorizontal className={`h-5 w-5 ${textBlue}`} /> Job Filters
                            </h2>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto pr-1">
                            <FilterCards
                                selectedFilters={selectedFilters}
                                setSelectedFilters={setSelectedFilters}
                            />
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex gap-3 mt-4">
                            <button
                                className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
                                onClick={() =>
                                    setSelectedFilters({ location: "", industry: "", experience: "", salary: "" })
                                }
                            >
                                Clear All
                            </button>
                            <button
                                className={`w-full py-2.5 rounded-xl ${primaryBlue} text-white font-semibold text-sm shadow-md`}
                                onClick={() => setIsMobileFilterOpen(false)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Left Filter Sidebar (Desktop) */}
            <div className="hidden lg:block w-1/4 flex-shrink-0">
                <div className="sticky top-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between border-b pb-4 mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <SlidersHorizontal className={`h-5 w-5 ${textBlue}`} /> Job Filters
                        </h2>
                        <button
                            className={`text-sm ${textBlue} hover:underline transition font-medium`}
                            onClick={() =>
                                setSelectedFilters({ location: "", industry: "", experience: "", salary: "" })
                            }
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                        <FilterCards
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                        />
                    </div>
                </div>
            </div>

            {/* Right Job Cards Section */}
            <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6 tracking-tight">
                    Showing <span className={`font-extrabold ${textBlue}`}>{totalJobs}</span> matching job(s)
                </h3>

                <div className="lg:h-[80vh] lg:overflow-y-auto lg:pr-2 pb-5">
                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => handleApplyClick(job)}
                                    className="relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 flex flex-col cursor-pointer border border-gray-100"
                                >
                                    {/* Job Type + Bookmark */}
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-[10px] sm:text-[11px] font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-full">
                                            <Briefcase className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${textBlue}`} /> {job.type}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle bookmark toggle here if needed
                                            }}
                                            className={`p-1.5 rounded-full text-gray-400 hover:${textBlue} hover:bg-blue-50 transition`}
                                        >
                                            <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </button>
                                    </div>

                                    {/* Company Info */}
                                    <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-3">
                                        <div
                                            className={`w-10 h-10 sm:w-11 sm:h-11 ${primaryBlue} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}
                                        >
                                            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <div className="text-left flex-grow min-w-0">
                                            <h3 className="font-bold text-sm sm:text-[16px] text-gray-900 leading-snug truncate">
                                                {job.company}
                                            </h3>
                                            <p className="text-[11px] sm:text-[12px] text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                                                <User className="h-3 w-3 text-gray-400 flex-shrink-0" /> <span className="truncate">Posted By: {job.alumni}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Job Details Card */}
                                    <div className="flex-grow min-h-[40px] mb-3">
                                        <JobCards job={job} />
                                    </div>

                                    {/* Footer: Location & Apply Button */}
                                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 gap-2">
                                        <p className="text-xs sm:text-[13.5px] font-semibold text-gray-600 flex items-center gap-1 truncate">
                                            <MapPin className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${textBlue} flex-shrink-0`} /> <span className="truncate">{job.location}</span>
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleApplyClick(job);
                                            }}
                                            className={`px-3.5 sm:px-5 py-2 rounded-xl ${primaryBlue} text-white font-semibold ${hoverBlue} transition-all duration-300 text-xs sm:text-sm shadow-md shadow-blue-500/20 flex-shrink-0`}
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-16 sm:py-20 border-t border-gray-200 mt-5 bg-white rounded-2xl shadow-sm px-4">
                            <p className="text-base sm:text-[18px] font-medium">No jobs found matching your criteria.</p>
                            <p className="text-xs sm:text-[15px] mt-2 text-gray-400">Try adjusting your filter selections.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;