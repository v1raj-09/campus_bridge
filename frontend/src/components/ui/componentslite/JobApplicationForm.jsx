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
       
        
       
        setTimeout(() => { 
            if (job) {
              setFetchedJob(job);
            } else {
            
              console.error(`Job with ID ${jobId} not found.`);
              // alert("Selected job not found. Redirecting to job listings.");
              // navigate('/jobs'); 
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
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-700 mb-4"></div>
        <p className="text-lg text-gray-600">Loading job details...</p>
      </div>
    );
  }

  // --- Job Not Found Error UI ---
  if (!fetchedJob) {
       return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
            <h1 className="text-3xl font-extrabold text-red-600 mb-4">Job Not Found!</h1>
            <p className="text-lg text-gray-600">The job you are trying to apply for does not exist or has been removed.</p>
            <button 
                onClick={() => navigate('/jobs')} 
                className="mt-6 px-6 py-3 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition"
            >
                Back to All Jobs
            </button>
        </div>
    );
  }

  // --- Success Message Display ---
  if (submissionStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
        <CheckCircle className="h-20 w-20 text-green-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Application Submitted Successfully!</h1>
        <p className="text-lg text-gray-600 text-center">
          Thank you for applying to the **{fetchedJob.title}** role at **{fetchedJob.company}**.
        </p>
        <p className="mt-4 text-violet-600 font-medium">
          Redirecting to your dashboard shortly...
        </p>
      </div>
    );
  }
  
  // --- Main Form UI ---
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      
      {/* ======================= Job Info Header (Real Data) ======================= */}
      <div className={`p-8 rounded-xl shadow-xl mb-10 ${primaryViolet} text-white`}>
        <div className="flex items-center mb-2">
            <Briefcase className="h-6 w-6 mr-3 text-violet-200" />
            <h1 className="text-3xl font-extrabold tracking-tight">{fetchedJob.title}</h1>
        </div>
        <h2 className="text-xl font-semibold text-violet-200 mb-2">{fetchedJob.company}</h2> 
        <div className="flex items-center text-sm font-medium text-violet-300">
            <MapPin className="h-4 w-4 mr-1" /> {fetchedJob.location} ({fetchedJob.mode})
            <span className="ml-4 border-l border-violet-500 pl-4">Posted By: {fetchedJob.alumni}</span> 
        </div>
      </div>
      
      {/* ======================= Application Form ======================= */}
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        {/* ... (Form Fields are the same as before) ... */}
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Your Details</h3>
        
        {/* --- Personal Details Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
                <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <User className={`h-4 w-4 mr-2 ${textViolet}`} /> Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Enter your full name as per college record"
                />
            </div>

            {/* Email Address */}
            <div>
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Mail className={`h-4 w-4 mr-2 ${textViolet}`} /> Email Address (College ID)
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="e.g., yourname@rmcet.com"
                />
            </div>

            {/* Phone Number */}
            <div className="md:col-span-1">
                <label htmlFor="phoneNumber" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Phone className={`h-4 w-4 mr-2 ${textViolet}`} /> Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="Enter your 10 digit number"
                />
            </div>

        </div>

        {/* --- Resume Upload Section --- */}
        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Document Upload</h3>

            <label htmlFor="resume" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className={`h-4 w-4 mr-2 ${textViolet}`} /> Upload Resume (PDF only)
            </label>
            <div className="flex items-center">
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
                    className="cursor-pointer flex items-center justify-center p-4 border-2 border-dashed border-violet-400 rounded-lg w-full text-gray-600 hover:bg-violet-50 transition"
                >
                    <Upload className="h-5 w-5 mr-3 text-violet-500" />
                    {formData.resume ? (
                        <span className="font-semibold text-violet-700">File Selected: {formData.resume.name}</span>
                    ) : (
                        <span>Click to upload your Resume (PDF)</span>
                    )}
                </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Max file size 2MB. Only PDF format accepted.</p>
        </div>


        {/* --- Submit Button --- */}
        <div className="pt-6">
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-lg font-semibold rounded-lg transition duration-300 flex items-center justify-center 
                  ${isSubmitting 
                    ? 'bg-violet-400 text-white cursor-not-allowed' 
                    : `${primaryViolet} text-white hover:bg-violet-800 shadow-lg shadow-violet-500/50`
                  }`}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Application...
                    </>
                ) : (
                    <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Application
                    </>
                )}
            </button>
            {submissionStatus === 'error' && (
                <p className="mt-3 text-center text-red-500 font-medium">Application failed. Please check your details and try again.</p>
            )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;