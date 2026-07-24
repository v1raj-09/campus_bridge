import React from "react";

const JobCards = ({ job }) => {
    return (
        <div className="text-left w-full">
            <h2 className="font-extrabold text-lg sm:text-xl text-gray-900 leading-snug mb-1.5 break-words">
                {job.title}
            </h2>
            {/* Company Name */}
            <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{job.company}</p>
            {/* Location */}
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">{job.location}</p>
        </div>
    );
};

export default JobCards;