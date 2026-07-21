import React, { useState, useEffect } from 'react';
import { Mail, Phone, Edit, FileText, Briefcase, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage } from '../avatar';
import { Button } from '../button';

// Role mapping dictionary
const ROLE_MAP = {
  alumni: "Alumni",
  student: "Student",
  admin: "Administrator",
};

// Subcomponent: Student Section
const StudentSection = ({ resumeLink }) => (
  <div className="mt-8 border-t pt-6 relative z-10">
    <h2 className="text-xl font-semibold mb-3 text-gray-800">Resume Management</h2>
    {resumeLink ? (
      <a
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
      >
        <FileText className="w-5 h-5" /> View / Update Resume
      </a>
    ) : (
      <Button
        variant="outline"
        className="text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center gap-2"
        onClick={() => console.log('Student Upload Resume')}
      >
        <FileText className="w-4 h-4" /> Upload Resume
      </Button>
    )}
  </div>
);

// Subcomponent: Alumni Section
const AlumniSection = ({ jobsPosted = 0, mentorshipSessions = 0 }) => (
  <div className="mt-8 border-t pt-6 relative z-10">
    <h2 className="text-xl font-semibold mb-3 text-gray-800">Alumni Contribution Summary</h2>
    <div className="space-y-3 text-gray-700">
      <p className="flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-red-500" />
        Jobs Posted: <span className="font-semibold text-lg">{jobsPosted}</span>
      </p>
      <p className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-purple-500" />
        Mentorship Sessions: <span className="font-semibold text-lg">{mentorshipSessions}</span>
      </p>
      <p className="text-sm text-gray-500 mt-4">
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-10 text-gray-600 font-medium">Loading Profile...</div>
    </div>
  );

  const roleDisplay = ROLE_MAP[user.role] || "User";
  const isStudent = user.role === 'student';
  const isAlumni = user.role === 'alumni';

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 relative p-8 md:p-12 overflow-hidden">

        {/* Decorative Background Shapes */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-pulse delay-200"></div>

        {/* Edit Button */}
        <button
          className="absolute top-5 right-5 p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
          onClick={() => console.log('Edit Profile Clicked')}
        >
          <Edit className="w-5 h-5" />
        </button>

        {/* Header: Avatar + Name + Role */}
        <div className="flex items-center gap-6 mb-8 border-b pb-6 relative z-10">
          <Avatar className="w-20 h-20 shadow-lg ring-2 ring-blue-400/30">
            <AvatarImage src={user.profile_photo || "/default-avatar.png"} alt={user.fullname || 'User'} />
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.fullname || 'NA'}</h1>
            <p className="text-gray-500 font-medium">{roleDisplay}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 relative z-10">
          <a href={`mailto:${user.email}`} className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{user.email || 'NA Email'}</span>
          </a>
          <a href={`tel:${user.phone}`} className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>{user.phone || 'NA Phone'}</span>
          </a>
        </div>

        {/* Skills */}
        <div className="mb-8 relative z-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Skills</h2>
          <p className="text-gray-600">{user.skills || 'NA'}</p>
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
          <div className="mt-8 border-t pt-6 relative z-10">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Additional Information</h2>
            <p className="text-gray-600">No role-specific profile data available here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
