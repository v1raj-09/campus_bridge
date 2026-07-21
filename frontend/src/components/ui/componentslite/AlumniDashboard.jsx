// AlumniDashboard.jsx (Updated)

import React, { useState } from 'react';
import { Briefcase, Users, MessageSquare, Newspaper, TrendingUp, DollarSign, Loader2, X, MapPin } from 'lucide-react'; 
import { addJobToData, getJobData } from "./JobData.js"; 

const DEFAULT_ALUMNI_NAME = "Aarti Sawant"; 
const ALUMNI_ID = 101; 

const getInitialStats = () => {
    const allJobs = getJobData(); 
    
    const postedByMe = allJobs.filter(job => job.alumni === DEFAULT_ALUMNI_NAME);
    
    return {
        initialStats: {
            openJobs: 45, mentorshipRequests: 7, networkConnections: 540, 
            jobsPostedByMe: postedByMe.length, 
        },
        initialMyPostedJobs: postedByMe.map(job => ({ 
             id: job.id,
             title: job.title,
             location: job.location,
             status: job.status || "Pending Admin Approval", 
             datePosted: new Date(job.id).toLocaleDateString('en-IN'), 
        })),
    };
};

const JobCard = ({ job }) => {
    const statusColor = job.status.includes('Pending') ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';

    return (
        <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-md">
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold text-red-600 truncate">{job.title}</h4>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                    {job.status}
                </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                <span>{job.location}</span>
            </div>
            
            <p className="text-xs text-gray-500 border-t pt-2 mt-3">
                Posted on: {job.datePosted}
            </p>
            <button className="mt-3 text-red-500 hover:text-red-700 text-sm font-medium transition">
                View/Edit
            </button>
        </div>
    );
};

const AlumniJobPostForm = ({ onPostSuccess, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [companyName, setCompanyName] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (!title || !description || !location || !companyName) { 
            setMessage({ type: 'error', text: 'All fields are required.' });
            return;
        }
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            const postedJobData = { 
                title, 
                location, 
                description, 
                company: companyName 
            };
            
            setMessage({ type: 'success', text: 'Job posted successfully! Updating dashboard...' });
            
            setTimeout(() => { 
                onPostSuccess(postedJobData); 
            }, 1000);

        } catch (error) {
            setMessage({ type: 'error', text: `❌ Failed to post job: Server error` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border border-red-300 bg-red-50 rounded-xl shadow-xl mb-8 relative">
            
            <button onClick={onCancel} className="absolute top-3 right-3 p-1 rounded-full text-gray-500 hover:bg-red-100 transition" title="Close Form">
                <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-bold text-red-700 mb-5 border-b border-red-200 pb-2 flex items-center gap-2">
                <Briefcase className="w-6 h-6" /> Create New Job Posting
            </h3>
            
            {message && (
                <div className={`p-3 text-sm rounded-lg mb-4 font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-200 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Briefcase className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required 
                                   placeholder="e.g., Software Engineer"
                                   className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:border-red-500 focus:ring-red-500 transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required
                                   placeholder="e.g., Google, TCS"
                                   className="pl-3 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:border-red-500 focus:ring-red-500 transition" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required
                                   placeholder="e.g., Pune, Remote, Mumbai"
                                   className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:border-red-500 focus:ring-red-500 transition" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Description <span className="text-red-500">*</span></label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required
                                   placeholder="Provide detailed description, responsibilities, and company details..."
                                   className="block w-full rounded-md border border-gray-300 shadow-sm p-3 text-sm focus:border-red-500 focus:ring-red-500 transition"></textarea>
                </div>

                <div className="pt-2">
                    <button type="submit" disabled={loading} className={`w-full py-3 px-6 rounded-lg text-white font-bold flex items-center justify-center shadow-lg transition duration-200 ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}>
                        {loading ? <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Posting Job...</> : 'Post Job for Admin Approval'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const AlumniDashboard = () => {
    
    const { initialStats, initialMyPostedJobs } = getInitialStats();

    const [stats, setStats] = useState(initialStats);
    const [showJobPostForm, setShowJobPostForm] = useState(false);
    const [myPostedJobs, setMyPostedJobs] = useState(initialMyPostedJobs); 

    const handlePostJob = () => {
        setShowJobPostForm(true); 
    };

    const handlePostSuccess = (postedJobData) => { 
        setShowJobPostForm(false);
        
        setStats(prevStats => ({
            ...prevStats,
            jobsPostedByMe: prevStats.jobsPostedByMe + 1
        }));
        
        const newJobId = Date.now();
        const newJobForGlobalList = {
            id: newJobId, 
            alumni: DEFAULT_ALUMNI_NAME, 
            company: postedJobData.company, 
            location: postedJobData.location,
            industry: "Alumni Posted", 
            experience: "Not Specified",
            title: postedJobData.title,
            description: postedJobData.description,
            positions: "1 Position",
            salary: "Negotiable",
            mode: "Full-Time",
            type: "Full-Time",
            status: "Pending Admin Approval",
        };
        addJobToData(newJobForGlobalList); 

        const newJobForDashboard = {
            id: newJobId,
            title: postedJobData.title,
            location: postedJobData.location,
            status: "Pending Admin Approval", 
            datePosted: new Date().toLocaleDateString('en-IN'),
        };
        setMyPostedJobs(prevJobs => [newJobForDashboard, ...prevJobs]); 
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
                Alumni Connect Dashboard
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <div className={`p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl border-blue-500 hover:border-blue-600 bg-white border-t-4 border-b-2`}>
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-500 uppercase">Open Job Postings</h4>
                        <Briefcase className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-gray-800">{stats.openJobs}</p>
                    <p className="mt-4 text-xs text-gray-600 border-t pt-2">Total jobs available for current students</p>
                </div>
                 <div className={`p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl border-purple-500 hover:border-purple-600 bg-white border-t-4 border-b-2`}>
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-500 uppercase">Mentorship Requests</h4>
                        <MessageSquare className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-gray-800">{stats.mentorshipRequests}</p>
                    <p className="mt-4 text-xs text-gray-600 border-t pt-2">New students seeking your guidance</p>
                </div>
                 <div className={`p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl border-green-500 hover:border-green-600 bg-white border-t-4 border-b-2`}>
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-500 uppercase">Network Connections</h4>
                        <Users className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-gray-800">{stats.networkConnections}</p>
                    <p className="mt-4 text-xs text-gray-600 border-t pt-2">View alumni directory</p>
                </div>
                 <div className={`p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl border-red-500 hover:border-red-600 bg-white border-t-4 border-b-2`}>
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-500 uppercase">Your Jobs Posted</h4>
                        <TrendingUp className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-gray-800">{stats.jobsPostedByMe}</p>
                    <p className="mt-4 text-xs text-gray-600 border-t pt-2">Total jobs offered to the campus</p>
                </div>
            </div>
            
            {showJobPostForm && (
                <AlumniJobPostForm
                    onPostSuccess={handlePostSuccess}
                    onCancel={() => setShowJobPostForm(false)}
                />
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
                    <div className="flex items-center mb-6 border-b pb-3">
                        <DollarSign className="w-6 h-6 mr-3 text-green-600" />
                        <h3 className="text-xl font-bold text-gray-800">Contribute & Connect</h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-6">
                        Support your institution by offering jobs to students.
                    </p>

                    <div className="max-w-xs">
                        <button
                            className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-sm transition duration-200 flex items-center justify-center shadow-md ${showJobPostForm ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                            onClick={handlePostJob}
                            disabled={showJobPostForm} 
                        >
                            <Briefcase className="w-5 h-5 mr-2" />
                            {showJobPostForm ? 'Form Open' : 'Post a Job'}
                        </button>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-700 mb-3">Your Contributions Summary</h4>
                        <ul className="text-sm space-y-2 text-gray-600">
                            <li className="flex justify-between">Jobs Posted: <span className="font-semibold text-blue-600">{stats.jobsPostedByMe}</span></li>
                            <li className="flex justify-between">Students Mentored: <span className="font-semibold text-blue-600">5</span> (Placeholder)</li>
                        </ul>
                    </div>
                </div>

                <div className="p-8 bg-white shadow-xl rounded-xl border border-gray-100">
                    <div className="flex items-center mb-6 border-b pb-3">
                        <Newspaper className="w-6 h-6 mr-3 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-800">Campus News</h3>
                    </div>
                    <ul className="space-y-4 text-sm">
                        <li className="p-3 border-l-4 border-blue-500 bg-blue-50/50 rounded cursor-pointer transition hover:bg-blue-100">
                           <p className="font-semibold text-gray-800">Alumni Meetup in Mumbai</p>
                           <p className="text-xs text-gray-600">Details and registration link.</p>
                        </li>
                        <li className="p-3 border-l-4 border-green-500 bg-green-50/50 rounded cursor-pointer transition hover:bg-green-100">
                           <p className="font-semibold text-gray-800">New Research Center Inaugurated</p>
                           <p className="text-xs text-gray-600">See how your donations help.</p>
                        </li>
                        <li className="p-3 border-l-4 border-yellow-500 bg-yellow-50/50 rounded cursor-pointer transition hover:bg-yellow-100">
                           <p className="font-semibold text-gray-800">Career Fair Success</p>
                           <p className="text-xs text-gray-600">Over 50 companies participated.</p>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-red-600" /> My Posted Jobs
                </h2>
                
                {myPostedJobs.length === 0 ? ( 
                    <p className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">You haven't posted any jobs yet. Click "Post a Job" to contribute!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {myPostedJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlumniDashboard;