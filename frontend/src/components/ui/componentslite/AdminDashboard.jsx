import React, { useEffect, useState } from 'react';
import { Users, BriefcaseBusiness, FileText, Settings, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

import UserListComponent from './UserListComponent.jsx'; 
import SettingsComponent from './SettingsComponent.jsx';


const primaryViolet = "bg-[#6A38C2]";
const textViolet = "text-[#6A38C2]";
const hoverViolet = "hover:bg-[#5A28A2]";


// Top Navigation/Tab Items
const navTabs = [
    { name: "Overview", icon: Activity, key: "overview" },
    { name: "Users", icon: Users, key: "users" }, 
    { name: "Job Approvals", icon: BriefcaseBusiness, key: "jobs" }, 
    { name: "Settings", icon: Settings, key: "settings" },
];

const stats = [
   
    { label: "Pending Jobs", value: "15", icon: BriefcaseBusiness, color: textViolet, border: "border-[#6A38C2]" },
    { label: "Total Users", value: "1,250", icon: Users, color: "text-blue-600", border: "border-blue-400" },
    { label: "Resumes Uploaded", value: "42", icon: FileText, color: "text-green-600", border: "border-green-400" },
];


const AdminDashboard = () => {
    const [adminName, setAdminName] = useState("Admin");
    const [activeTab, setActiveTab] = useState("overview"); 
    const navigate = useNavigate();
    
  
    const [recentActivities, setRecentActivities] = useState([
        { id: 1, action: "Approved job: Software Engineer @ TCS", time: "5 mins ago", color: "text-green-500" },
        { id: 2, action: "New user registered: Rohan D.", time: "1 hour ago", color: "text-blue-500" },
        { id: 3, action: "Job posting deleted: Marketing Intern", time: "3 hours ago", color: "text-red-500" },
    ]);


    useEffect(() => {
        
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const user = JSON.parse(userString);
                setAdminName(user.fullname || "Anish Bare"); 
            } catch (e) { 
                console.error("Failed to parse user data from localStorage");
            }
        }
    }, []);

    
    // =================================================================================
    // 💡 Component for Overview Tab Content
    const OverviewContent = () => (
        <div className="space-y-10">
            
            {/* --- A. Stats Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} 
                         className={`bg-white p-6 rounded-xl border-l-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${stat.border}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                                <h3 className="text-sm font-medium text-gray-500 mt-1">{stat.label}</h3>
                            </div>
                            <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* --- B. Detailed Panels: Recent Activity & Quick Links --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-5">
                
                {/* Panel 1: Recent Activity (lg:col-span-2) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 p-4 border-b border-gray-100">
                        Recent Admin Activity Log
                    </h2>
                    
                    {/* Activities List */}
                    <ul className="divide-y divide-gray-100">
                        {recentActivities.map((activity) => (
                            <li key={activity.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition duration-150">
                                <div className="flex items-center gap-3">
                                    <Activity className={`w-5 h-5 ${activity.color}`} />
                                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">{activity.time}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="p-4 text-center border-t border-gray-100">
                     
                        <button className={`text-sm ${textViolet} hover:underline`}>View Full Logs</button>
                    </div>
                </div>

                {/* Panel 2: Quick Links (lg:col-span-1) */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                     
                        <button className={`w-full py-2.5 ${primaryViolet} text-white rounded-lg font-medium ${hoverViolet} transition shadow-lg shadow-violet-500/30`}>
                            + Add New Admin
                        </button>
                        {/* Force System Backup - Dark Button */}
                        <button className="w-full py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition shadow-md">
                            Force System Backup
                        </button>
                        {/* Clear Cache - Red Accent Button */}
                        <button className="w-full py-2.5 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition">
                            Clear Cache
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    // =================================================================================


    return (
        <div className="min-h-screen bg-gray-50">
            
            {/* 1. 🔝 Top Header and Tabs Bar */}
            <header className="bg-white border-b border-gray-200 shadow-lg sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Welcome Text */}
                    <div className="py-4">
                        <h1 className="text-3xl font-extrabold text-gray-900">Admin Panel</h1>
                        <p className="text-sm text-gray-500">Welcome, <span className="font-semibold text-gray-700">{adminName}</span>. Manage your system effectively.</p>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex space-x-8 pt-1">
                        {navTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-colors duration-200 ease-in-out
                                    ${activeTab === tab.key 
                                        ? `${textViolet} border-b-2 border-[#6A38C2]` 
                                        : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-400'}`
                                }
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* 2. 📝 Main Content Area (Conditional Rendering) */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* 🚀 Tab Content */}
                {activeTab === 'overview' && <OverviewContent />}
                {activeTab === 'users' && <UserListComponent />} 
                {activeTab === 'jobs' && <JobApprovalComponent />} 
                {activeTab === 'settings' && <SettingsComponent />}
                
            </main>
        </div>
    );
};

export default AdminDashboard;