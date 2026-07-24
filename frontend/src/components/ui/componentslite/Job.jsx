import React from "react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "../button";
import { Bookmark, MapPin, Briefcase, User, Building2 } from "lucide-react"; 
import JobCards from "./JobCards"; 
import { getJobData } from "./JobData.js"; 

const Job = () => {
    
    const jobData = getJobData();
    const navigate = useNavigate();

    const primaryViolet = "bg-[#6A38C2]";
    const hoverViolet = "hover:bg-violet-700";
    const textViolet = "text-[#6A38C2]";
    
    const handleApplyClick = (jobId) => {
        navigate(`/apply/${jobId}`); 
    };
    
    return (
        <div className="w-full">
            {jobData.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 font-medium">No jobs available right now. Please check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {jobData.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => handleApplyClick(job.id)}
                            className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-violet-100 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between cursor-pointer group h-full"
                        >
                            <div>
                                {/* Top Meta Row */}
                                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3 gap-2">
                                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 bg-violet-50 text-violet-700 px-3 py-1 rounded-full truncate">
                                        <Briefcase className={`h-3 w-3 ${textViolet} flex-shrink-0`} /> 
                                        <span className="truncate">{job.type || "Full-time"}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle bookmark action here if needed
                                        }}
                                        className={`p-2 rounded-full text-gray-400 hover:${textViolet} hover:bg-violet-50 transition flex-shrink-0`}
                                        aria-label="Bookmark Job"
                                    >
                                        <Bookmark className="h-5 w-5" /> 
                                    </button>
                                </div>

                                {/* Company Info */}
                                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${primaryViolet} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/20`}>
                                        <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 leading-snug truncate group-hover:text-[#6A38C2] transition-colors">{job.company}</h3>
                                        <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mt-1 truncate">
                                            <User className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" /> 
                                            <span className="truncate">Posted By: {job.alumni}</span>
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Job Sub-cards/Details */}
                                <div className="mb-4 text-gray-600 text-sm">
                                    <JobCards job={job} />
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100 gap-3">
                                <p className={`text-sm sm:text-base font-semibold ${textViolet} flex items-center gap-1.5 truncate max-w-full`}>
                                    <MapPin className="h-4 w-4 flex-shrink-0" /> 
                                    <span className="truncate">{job.location}</span>
                                </p>
                                
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleApplyClick(job.id);
                                    }}
                                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl ${primaryViolet} text-white font-semibold ${hoverViolet} transition-all duration-300 text-sm shadow-md shadow-violet-500/20 flex items-center justify-center`}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Job;