import React, { useState, useEffect } from 'react';
import { Mail, Phone, Edit, FileText, Briefcase, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage } from '../avatar';
import { Button } from '../button';

// Role mapping dictionary
const ROLE_MAP = {
  alumni: "Alumni",
  alumini: "Alumni",
  student: "Student",
  admin: "Administrator",
};

// Subcomponent: Student Section
const StudentSection = ({ resumeLink }) => (
  <div className="mt-6 sm:mt-8 border-t border-gray-100 pt-5 sm:pt-6 relative z-10">
    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Resume Management</h2>
    {resumeLink ? (
      <a
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm sm:text-base break-all"
      >
        <FileText className="w-5 h-5 flex-shrink-0" /> View / Update Resume
      </a>
    ) : (
      <Button
        variant="outline"
        className="text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center gap-2 text-sm sm:text-base py-2.5 px-4 rounded-xl"
        onClick={() => console.log('Student Upload Resume')}
      >
        <FileText className="w-4 h-4 flex-shrink-0" /> Upload Resume
      </Button>
    )}
  </div>
);

// Subcomponent: Alumni Section
const AlumniSection = ({ jobsPosted = 0, mentorshipSessions = 0 }) => (
  <div className="mt-6 sm:mt-8 border-t border-gray-100 pt-5 sm:pt-6 relative z-10">
    <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">Alumni Contribution Summary</h2>
    <div className="space-y-3 text-gray-700 text-sm sm:text-base">
      <p className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-[#FA4F09] flex-shrink-0" />
        Jobs Posted: <span className="font-semibold text-base sm:text-lg">{jobsPosted}</span>
      </p>
      <p className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-purple-500 flex-shrink-0" />
        Mentorship Sessions: <span className="font-semibold text-base sm:text-lg">{mentorshipSessions}</span>
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
        For detailed history, please visit your <span className="font-medium text-gray-800">Dashboard</span>.
      </p>
    </div>
  </div>
);

const Profile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setUser({ ...userData, role: userData.role ? userData.role.toLowerCase() : 'unknown' });
      } catch (e) {
        console.error("Error parsing user data:", e);
        setUser({});
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/70">
      <div className="text-center p-10 text-gray-600 font-medium">Loading Profile...</div>
    </div>
  );

  const roleDisplay = ROLE_MAP[user.role] || "User";
  const isStudent = user.role === 'student';
  const isAlumni = user.role === 'alumni' || user.role === 'alumini';

  return (
    <div className="bg-gray-50/70 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 pt-20 sm:pt-24">
      <div className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 relative p-5 sm:p-8 md:p-12 overflow-hidden">

        {/* Decorative Background Shapes */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl animate-pulse delay-200 pointer-events-none"></div>

        {/* Edit Button */}
        <button
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          onClick={() => console.log('Edit Profile Clicked')}
          aria-label="Edit Profile"
        >
          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header: Avatar + Name + Role */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 border-b border-gray-100 pb-5 sm:pb-6 relative z-10">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20 shadow-md ring-2 ring-blue-500/20 flex-shrink-0">
            <AvatarImage src={user.profile_photo || "/default-avatar.png"} alt={user.fullname || 'User'} />
          </Avatar>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{user.fullname || 'NA'}</h1>
            <span className="inline-block mt-1 bg-blue-50 text-[#2563EB] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {roleDisplay}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 relative z-10 text-sm sm:text-base">
          <a href={`mailto:${user.email}`} className="flex items-center gap-3 text-gray-700 hover:text-[#2563EB] transition truncate">
            <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{user.email || 'NA Email'}</span>
          </a>
          <a href={`tel:${user.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-[#2563EB] transition truncate">
            <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{user.phone || 'NA Phone'}</span>
          </a>
        </div>

        {/* Skills */}
        <div className="mb-6 sm:mb-8 relative z-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Skills</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{user.skills || 'No skills listed yet.'}</p>
        </div>

        {/* Role-Based Sections */}
        {isStudent ? (
          <StudentSection resumeLink={user.resumeLink} />
        ) : isAlumni ? (
          <AlumniSection
            jobsPosted={user.jobsPosted || 0}
            mentorshipSessions={user.mentorshipSessions || 0}
          />
        ) : (
          <div className="mt-6 sm:mt-8 border-t border-gray-100 pt-5 sm:pt-6 relative z-10">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">Additional Information</h2>
            <p className="text-gray-600 text-sm sm:text-base">No role-specific profile data available here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;