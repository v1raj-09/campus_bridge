// StudentDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, UserCheck, Clock, Bell, UploadCloud, FileText, MapPin, Building2, User, X, CheckCircle, Hourglass } from 'lucide-react';
import JobCards from './JobCards';
import { subscribeToNotifications, getPersistentNotifications, getAppliedJobs, getJobData } from "./JobData.js";

// =========================================================================
// DUMMY DATA FOR DEMONSTRATION (For Pending and Active)
// =========================================================================
const getPendingApplications = (allJobs, appliedJobIds) => {
    // Simulate that 2 of the applied jobs are in 'Pending' status
    const pendingIds = appliedJobIds.slice(0, 2); 
    return allJobs
        .filter(job => pendingIds.includes(String(job.id)))
        .map(job => ({ ...job, status: 'Reviewing' }));
};    

const getActiveInternships = () => {
    // Dummy Data for Active Internships (IDs 5 and 6)
    return [
        { id: 105, company: 'Innovatech Solutions', title: 'Data Analyst Intern', type: 'Internship', location: 'Remote', duration: '6 Months', status: 'Active' },
        { id: 106, company: 'Green Earth Inc.', title: 'Marketing Intern', type: 'Internship', location: 'Mumbai', duration: '3 Months', status: 'Active' },
    ];
};

// =========================================================================
// Notification Card Component (As Is)
// =========================================================================
const NewJobAlertsCard = ({ notificationCount, latestAlert }) => {
    return (
        <div className="p-5 sm:p-6 rounded-xl shadow-lg border-t-4 border-red-500 bg-white">
            <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase">NEW JOB ALERTS</h4>
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </div>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">{notificationCount}</p>
            
            <div className="mt-4 pt-2 border-t border-gray-100">
                {latestAlert ? (
                    <div className="text-xs text-red-700 bg-red-100 p-2.5 rounded-md border border-red-200">
                        <p className="font-semibold">{latestAlert.title} <span className="text-gray-500">({latestAlert.time})</span></p>
                        <p className="mt-1 text-gray-700 font-medium truncate">{latestAlert.message}</p>
                    </div>
                ) : (
                    <p className="text-xs text-gray-600">View latest job alerts</p>
                )}
            </div>
        </div>
    );
};

// =========================================================================
// Main Student Dashboard Component
// =========================================================================
const StudentDashboard = () => {
    const navigate = useNavigate();

    // Stats and List Visibility States
    const [appliedJobsCount, setAppliedJobsCount] = useState(0);
    const [pendingAppsCount, setPendingAppsCount] = useState(0);
    const [activeInternCount, setActiveInternCount] = useState(0);

    const [notifications, setNotifications] = useState([]);
    
    // Visibility states for the lists
    const [showAppliedJobs, setShowAppliedJobs] = useState(false);
    const [showPendingApps, setShowPendingApps] = useState(false);
    const [showActiveInterns, setShowActiveInterns] = useState(false);

    // Resume state (As Is)
    const [resumeFile, setResumeFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(localStorage.getItem('resumeStatus') || 'No file chosen');
    const [uploading, setUploading] = useState(false);

    // =========================================================================
    // Handlers
    // =========================================================================
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFile(file);
            setUploadStatus(file.name);
        } else {
            setResumeFile(null);
            setUploadStatus('No file chosen');
        }
    };

    const handleUpload = async () => {
        if (!resumeFile) {
            alert("Please select a file to upload.");
            return;
        }
        setUploading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const newStatus = `Uploaded: ${resumeFile.name} (${new Date().toLocaleTimeString('en-IN')})`;
            setUploadStatus(newStatus);
            localStorage.setItem('resumeStatus', newStatus);
            alert(`Resume (${resumeFile.name}) uploaded successfully!`);
        } catch (error) {
            setUploadStatus('Upload failed');
            alert("Upload failed. Please try again.");
        } finally {
            setUploading(false);
            setResumeFile(null);
        }
    };

    const handleCheckResume = () => {
        if (uploadStatus.startsWith('Uploaded:')) {
            alert(`Current Resume: ${uploadStatus}. This resume is ready for applications.`);
        } else {
            alert(`Current Status: ${uploadStatus}. Please upload your resume.`);
        }
    };

    // Unified function to toggle list visibility and manage no-data alerts
    const handleCardClick = (listName, count, toggleFunction) => {
        if (count > 0) {
            // Close other open lists to ensure only one is visible at a time
            if (listName !== 'applied') setShowAppliedJobs(false);
            if (listName !== 'pending') setShowPendingApps(false);
            if (listName !== 'active') setShowActiveInterns(false);

            // Toggle the clicked list's visibility
            toggleFunction(prev => !prev);
        } else {
            alert(`You have no ${listName} items to display yet.`);
            toggleFunction(false);
        }
    };

    // =========================================================================
    // Data Load & Fetching
    // =========================================================================
    const allJobs = getJobData();
    const appliedJobIds = getAppliedJobs();
    
    // Filtered data for lists
    const appliedJobs = allJobs.filter(job => appliedJobIds.includes(String(job.id)));
    const pendingApplications = getPendingApplications(allJobs, appliedJobIds);
    const activeInternships = getActiveInternships();

    useEffect(() => {
        const loadDashboardData = () => {
            setAppliedJobsCount(appliedJobs.length);
            setPendingAppsCount(pendingApplications.length);
            setActiveInternCount(activeInternships.length);
            setNotifications(getPersistentNotifications());
        };

        loadDashboardData();

        const unsubscribe = subscribeToNotifications((newNotification) => {
            setNotifications(prevNotifs => [newNotification, ...prevNotifs]);
            loadDashboardData();
        });

        const handleStorageChange = (event) => {
            if (event.key === 'studentNotifications' || event.key === 'studentJobApplications') {
                loadDashboardData();
                // Close all lists on data change
                setShowAppliedJobs(false);
                setShowPendingApps(false);
                setShowActiveInterns(false);
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            unsubscribe();
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [appliedJobs.length, pendingApplications.length, activeInternships.length]); // Dependencies added

    const latestAlert = notifications.length > 0 ? notifications[0] : null;

    // =========================================================================
    // Generic List Component for Reusability (As Is)
    // =========================================================================
    const StatusList = ({ title, jobs, statusColor, statusIcon: Icon, closeHandler }) => (
        <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-3 gap-2">
                <h2 className={`text-xl sm:text-2xl font-bold ${statusColor} flex items-center gap-2 truncate`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> <span className="truncate">{title} ({jobs.length})</span>
                </h2>
                <button 
                    onClick={closeHandler} 
                    className="p-1.5 text-gray-500 hover:text-red-600 transition flex-shrink-0"
                    title="Close List"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {jobs.length === 0 ? (
                <p className="text-gray-600 text-base sm:text-lg">You have no {title.toLowerCase()} items yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => navigate(`/job-detail/${job.id}`)} 
                            className={`relative bg-gray-50 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 p-4 sm:p-5 flex flex-col cursor-pointer border-l-4 ${statusColor === 'text-green-700' ? 'border-green-500' : statusColor === 'text-blue-700' ? 'border-blue-500' : 'border-purple-500'}`}
                        >
                            <div className="flex items-center gap-3 mb-3 border-b border-gray-200 pb-3">
                                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#1E40AF] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left flex-grow min-w-0">
                                    <h3 className="font-bold text-[15px] sm:text-[16px] text-gray-900 leading-snug truncate">{job.company}</h3>
                                    <p className="text-[11px] sm:text-[12px] text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                                        <User className="h-3 w-3 text-gray-400 flex-shrink-0" /> <span className="truncate">{job.alumni ? `Posted By: ${job.alumni}` : 'Unknown Alumnus'}</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex-grow min-h-[45px] mb-3">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{job.title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" /> <span className="truncate">{job.location}</span>
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 gap-2">
                                <p className="text-[12px] sm:text-[13.5px] font-semibold text-gray-600 flex items-center gap-1 truncate">
                                    <Briefcase className="h-4 w-4 text-gray-500 flex-shrink-0" /> <span className="truncate">{job.type}</span>
                                </p>
                                <span className={`px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-lg text-xs sm:text-sm font-semibold cursor-default flex-shrink-0 ${statusColor === 'text-green-700' ? 'bg-green-600' : statusColor === 'text-blue-700' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                                    {job.status || title.split(' ')[0]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );


    // =========================================================================
    // JSX
    // =========================================================================
    // Determine which list to display
    let displayedList = null;

    if (showAppliedJobs) {
        displayedList = (
            <StatusList
                title="Your Applied Jobs"
                jobs={appliedJobs}
                statusColor="text-green-700"
                statusIcon={Briefcase}
                closeHandler={() => setShowAppliedJobs(false)}
            />
        );
    } else if (showPendingApps) {
        displayedList = (
            <StatusList
                title="Pending Applications"
                jobs={pendingApplications}
                statusColor="text-blue-700"
                statusIcon={Clock}
                closeHandler={() => setShowPendingApps(false)}
            />
        );
    } else if (showActiveInterns) {
        displayedList = (
            <StatusList
                title="Active Internships"
                jobs={activeInternships}
                statusColor="text-purple-700"
                statusIcon={UserCheck}
                closeHandler={() => setShowActiveInterns(false)}
            />
        );
    }


    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
                Student Dashboard
            </h1>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {/* 1. Applied Jobs Card (Clickable) */}
                <div 
                    className={`p-5 sm:p-6 rounded-xl shadow-lg border-t-4 border-green-500 bg-white cursor-pointer transition duration-300 ${appliedJobsCount > 0 ? 'hover:shadow-xl hover:scale-[1.02]' : 'cursor-default opacity-80'}`}
                    onClick={() => handleCardClick('applied', appliedJobsCount, setShowAppliedJobs)}
                    title={appliedJobsCount > 0 ? "Click to view applied jobs list" : "No jobs applied yet"}
                >
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase">APPLIED JOBS (TOTAL)</h4>
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    </div>
                    <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">{appliedJobsCount}</p>
                    <p className="mt-4 text-xs text-gray-600 border-t pt-2 font-semibold">
                        {appliedJobsCount > 0 ? (showAppliedJobs ? 'Click to Hide List' : 'Click to View List') : 'No jobs applied yet'}
                    </p>
                </div>

                {/* 2. Pending Applications Card (Clickable) */}
                <div 
                    className={`p-5 sm:p-6 rounded-xl shadow-lg border-t-4 border-blue-500 bg-white cursor-pointer transition duration-300 ${pendingAppsCount > 0 ? 'hover:shadow-xl hover:scale-[1.02]' : 'cursor-default opacity-80'}`}
                    onClick={() => handleCardClick('pending', pendingAppsCount, setShowPendingApps)}
                    title={pendingAppsCount > 0 ? "Click to view pending applications" : "No pending applications"}
                >
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase">PENDING APPLICATIONS</h4>
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    </div>
                    <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">{pendingAppsCount}</p>
                    <p className="mt-4 text-xs text-gray-600 border-t pt-2 font-semibold">
                        {pendingAppsCount > 0 ? (showPendingApps ? 'Click to Hide List' : 'Click to View List') : 'All applications processed'}
                    </p>
                </div>

                {/* 3. Active Internships Card (Clickable) */}
                <div 
                    className={`p-5 sm:p-6 rounded-xl shadow-lg border-t-4 border-purple-500 bg-white cursor-pointer transition duration-300 ${activeInternCount > 0 ? 'hover:shadow-xl hover:scale-[1.02]' : 'cursor-default opacity-80'}`}
                    onClick={() => handleCardClick('active', activeInternCount, setShowActiveInterns)}
                    title={activeInternCount > 0 ? "Click to view active internships" : "No active internships"}
                >
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase">ACTIVE INTERNSHIPS</h4>
                        <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    </div>
                    <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">{activeInternCount}</p>
                    <p className="mt-4 text-xs text-gray-600 border-t pt-2 font-semibold">
                        {activeInternCount > 0 ? (showActiveInterns ? 'Click to Hide List' : 'Click to View List') : 'No active internships'}
                    </p>
                </div>

                {/* 4. New Job Alerts Card (As Is) */}
                <NewJobAlertsCard 
                    notificationCount={notifications.length} 
                    latestAlert={latestAlert}
                />
            </div>
            
            {/* Conditional List Display Section (Removed the fallback message section) */}
            {displayedList}


            {/* Resume Management Section and Latest Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Resume Management Section (As Is) */}
                <div className="lg:col-span-2 p-5 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                        <UploadCloud className="w-5 h-5 text-purple-600 flex-shrink-0" /> Resume Management
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                        Upload your latest **PDF/DOCX resume**. Only the most recent version will be used for applications.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <label htmlFor="resume-upload" className="px-6 py-2.5 border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-50 transition w-full sm:w-auto text-center cursor-pointer text-sm sm:text-base">
                            Choose File
                        </label>
                        <input type="file" id="resume-upload" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
                        <span className={`text-xs sm:text-sm truncate ${uploadStatus.startsWith('Uploaded:') ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>
                            <FileText className="w-4 h-4 inline mr-1 flex-shrink-0" /> <span className="truncate">{uploadStatus}</span>
                        </span>
                        <button 
                            onClick={handleUpload}
                            disabled={uploading || !resumeFile} 
                            className={`px-6 py-2.5 text-white font-semibold rounded-lg shadow-md transition w-full sm:w-auto flex items-center justify-center text-sm sm:text-base flex-shrink-0 ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            {uploading ? <Clock className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                            {uploading ? 'Uploading...' : 'Upload Resume'}
                        </button>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <button 
                            onClick={handleCheckResume}
                            className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm sm:text-base shadow-sm"
                        >
                            Check Uploaded Resume Status
                        </button>
                    </div>
                </div>

                {/* Latest Alerts Section (As Is) */}
                <div className="lg:col-span-1 p-5 sm:p-6 bg-white shadow-xl rounded-xl border border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-3 flex items-center gap-2 border-b pb-2">
                        <Bell className="w-5 h-5 flex-shrink-0" /> Latest Alerts ({notifications.length})
                    </h2>
                    
                    {notifications.length === 0 ? (
                        <p className="p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">No new job alerts. Check back later!</p>
                    ) : (
                        <div className="space-y-3">
                            {notifications.slice(0, 4).map((alert) => (
                                <div key={alert.id} className="p-3 bg-red-50 border-l-4 border-red-400 rounded-md shadow-sm">
                                    <p className="font-bold text-red-700 text-sm truncate">{alert.title}</p>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{alert.message}</p>
                                </div>
                            ))}
                            {notifications.length > 4 && (
                                <p className="text-xs text-gray-500 mt-2">+{notifications.length - 4} more alerts...</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;