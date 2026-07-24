import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getJobById } from './JobData'; 
import { Briefcase, MapPin, CheckCircle, Upload, Send, User, Mail, Phone, FileText } from 'lucide-react';

const JobApplicationForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [fetchedJob, setFetchedJob] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '', 
    phoneNumber: '',
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); 

  // ==========================================================
 
  // ==========================================================
  useEffect(() => {
    try {
        const job = getJobById ? getJobById(jobId) : null;
        
        setTimeout(() => { 
            if (job) {
              setFetchedJob(job);
            } else {
              console.error(`Job with ID ${jobId} not found.`);
            }
            setIsLoading(false);
        }, 500); 
    } catch (error) {
        console.error("Error fetching job data:", error);
        setIsLoading(false);
        setFetchedJob(null); 
    }
  }, [jobId, navigate]);

  // ==========================================================
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    
    // ⭐ Application Submission Logic Here (Simulation) ⭐
    setTimeout(() => {
        setIsSubmitting(false);
        const success = true; 
        
        if (success) {
            setSubmissionStatus('success');
            setTimeout(() => navigate('/student/dashboard'), 3000);
        } else {
            setSubmissionStatus('error');
        }
    }, 2500);
  };
  
  const primaryViolet = "bg-violet-700";
  const textViolet = "text-violet-700";

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 sm:p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-700 mb-4"></div>
        <p className="text-base sm:text-lg text-gray-600">Loading job details...</p>
      </div>
    );
  }

  // --- Job Not Found Error UI ---
  if (!fetchedJob) {
       return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 sm:p-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-3">Job Not Found!</h1>
            <p className="text-sm sm:text-lg text-gray-600 max-w-md">The job you are trying to apply for does not exist or has been removed.</p>
            <button 
                onClick={() => navigate('/jobs')} 
                className="mt-6 px-6 py-3 bg-violet-700 text-white rounded-xl hover:bg-violet-800 transition text-sm sm:text-base font-semibold shadow-md"
            >
                Back to All Jobs
            </button>
        </div>
    );
  }

  // --- Success Message Display ---
  if (submissionStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 sm:p-8 text-center">
        <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-green-500 mb-6 animate-pulse" />
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3">Application Submitted Successfully!</h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-lg">
          Thank you for applying to the <span className="font-semibold text-gray-900">{fetchedJob.title}</span> role at <span className="font-semibold text-gray-900">{fetchedJob.company}</span>.
        </p>
        <p className="mt-4 text-violet-600 font-medium text-sm sm:text-base">
          Redirecting to your dashboard shortly...
        </p>
      </div>
    );
  }
  
  // --- Main Form UI ---
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      
      {/* ======================= Job Info Header (Real Data) ======================= */}
      <div className={`p-6 sm:p-8 rounded-2xl shadow-xl mb-8 sm:mb-10 ${primaryViolet} text-white`}>
        <div className="flex items-start sm:items-center mb-2">
            <Briefcase className="h-6 w-6 mr-3 text-violet-200 flex-shrink-0 mt-1 sm:mt-0" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">{fetchedJob.title}</h1>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-violet-200 mb-3">{fetchedJob.company}</h2> 
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm font-medium text-violet-300 gap-2 sm:gap-4 pt-2 border-t border-violet-600/50">
            <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" /> 
                <span>{fetchedJob.location} {fetchedJob.mode ? `(${fetchedJob.mode})` : ''}</span>
            </div>
            {fetchedJob.alumni && (
                <span className="sm:border-l sm:border-violet-500 sm:pl-4">Posted By: {fetchedJob.alumni}</span> 
            )}
        </div>
      </div>
      
      {/* ======================= Application Form ======================= */}
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Your Details</h3>
        
        {/* --- Personal Details Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Full Name */}
            <div>
                <label htmlFor="fullName" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    <User className={`h-4 w-4 mr-2 ${textViolet} flex-shrink-0`} /> Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
                    placeholder="Enter your full name"
                />
            </div>

            {/* Email Address */}
            <div>
                <label htmlFor="email" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className={`h-4 w-4 mr-2 ${textViolet} flex-shrink-0`} /> Email Address (College ID)
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
                    placeholder="e.g., yourname@rmcet.com"
                />
            </div>

            {/* Phone Number */}
            <div className="md:col-span-1">
                <label htmlFor="phoneNumber" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    <Phone className={`h-4 w-4 mr-2 ${textViolet} flex-shrink-0`} /> Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition"
                    placeholder="Enter 10-digit number"
                />
            </div>

        </div>

        {/* --- Resume Upload Section --- */}
        <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Document Upload</h3>

            <label htmlFor="resume" className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-2">
                <FileText className={`h-4 w-4 mr-2 ${textViolet} flex-shrink-0`} /> Upload Resume (PDF only)
            </label>
            <div className="flex items-center w-full">
                <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                    className="hidden" 
                />
                <label 
                    htmlFor="resume" 
                    className="cursor-pointer flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6 border-2 border-dashed border-violet-300 rounded-xl w-full text-gray-600 hover:bg-violet-50/50 transition text-center sm:text-left gap-2 sm:gap-0"
                >
                    <Upload className="h-6 w-6 sm:mr-3 text-violet-500 flex-shrink-0" />
                    {formData.resume ? (
                        <span className="font-semibold text-violet-700 break-all text-sm sm:text-base">File Selected: {formData.resume.name}</span>
                    ) : (
                        <span className="text-sm sm:text-base">Click to upload your Resume (PDF)</span>
                    )}
                </label>
            </div>
            <p className="text-xs text-gray-500 mt-1.5">Max file size 2MB. Only PDF format accepted.</p>
        </div>

        {/* --- Submit Button --- */}
        <div className="pt-4 sm:pt-6">
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 text-base sm:text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center 
                  ${isSubmitting 
                    ? 'bg-violet-400 text-white cursor-not-allowed' 
                    : `${primaryViolet} text-white hover:bg-violet-800 shadow-lg shadow-violet-500/30`
                  }`}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5 mr-3 text-white flex-shrink-0" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Application...</span>
                    </>
                ) : (
                    <>
                        <Send className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>Submit Application</span>
                    </>
                )}
            </button>
            {submissionStatus === 'error' && (
                <p className="mt-3 text-center text-red-500 font-medium text-sm sm:text-base">Application failed. Please check your details and try again.</p>
            )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;