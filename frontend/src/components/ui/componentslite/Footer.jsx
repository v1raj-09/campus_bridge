



import React from 'react'
import { Link } from 'react-router-dom'
// Lucide Icons for Social Media
import { Linkedin, Twitter, Facebook } from 'lucide-react'; 

const Footer = () => {
  return (
    // Purple Background from your code: bg-[#6A38C2]
    <div className="bg-[#6A38C2] text-gray-300 py-10">
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-bold tracking-wider">CAMPUS BRIDGE</h2>
          <p className="mt-4 text-sm max-w-[200px]">Connecting Campus talent with Alumni Support and Career Opportunities.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3 border-b-2 border-white/50 pb-1 inline-block">Quick Links</h3>
          {/* Using <ul> and React Link */}
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
            <li><Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
            <li><Link to="/internships" className="hover:text-white transition-colors">Internships</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3 border-b-2 border-white/50 pb-1 inline-block">Job Categories</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/jobs?category=fullstack" className="hover:text-white transition-colors">Full Stack Developer</Link></li>
            <li><Link to="/jobs?category=devops" className="hover:text-white transition-colors">DevOps Engineer</Link></li>
            <li><Link to="/jobs?category=ml" className="hover:text-white transition-colors">Machine Learning</Link></li>
            <li><Link to="/jobs?category=pm" className="hover:text-white transition-colors">Product Manager</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-3 border-b-2 border-white/50 pb-1 inline-block">Get in Touch</h3>
          <p className="text-sm">support@campusbridge.com</p>
          <p className="text-sm">+1 (555) 123-4567</p>
    
          {/* Social Icons (Using Lucide Icons) */}
          <div className="flex space-x-4 mt-5">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition-colors">
              <Linkedin className="w-5 h-5"/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition-colors">
              <Twitter className="w-5 h-5"/>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition-colors">
              <Facebook className="w-5 h-5"/>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright & Legal */}
      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-6">
        <p className="mb-2">© 2025 CampusBridge. All rights reserved.</p>
        <div className='flex justify-center space-x-4'>
            {/* PrivacyPolicy link corrected to use 'to' prop */}
            <Link to="/privacy-policy" className='hover:text-white transition-colors'>Privacy Policy</Link>
            <p>|</p>
            <Link to="/terms" className='hover:text-white transition-colors'>Terms & Conditions</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;
