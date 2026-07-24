import React from 'react'
import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Facebook } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="bg-[#6A38C2] text-gray-200 pt-12 pb-8 border-t border-[#5b2eb0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Adapts from 1 col on mobile, to 2 on tablets, to 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-white/20">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-white text-xl sm:text-2xl font-extrabold tracking-wider">CAMPUS BRIDGE</h2>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm sm:max-w-xs">
              Connecting Campus talent with Alumni Support and Career Opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base tracking-wide border-b-2 border-white/40 pb-1 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors block py-0.5">Home</Link></li>
              <li><Link to="/post-job" className="hover:text-white transition-colors block py-0.5">Post a Job</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors block py-0.5">Browse Jobs</Link></li>
              <li><Link to="/internships" className="hover:text-white transition-colors block py-0.5">Internships</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base tracking-wide border-b-2 border-white/40 pb-1 inline-block">
              Job Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/jobs?category=fullstack" className="hover:text-white transition-colors block py-0.5">Full Stack Developer</Link></li>
              <li><Link to="/jobs?category=devops" className="hover:text-white transition-colors block py-0.5">DevOps Engineer</Link></li>
              <li><Link to="/jobs?category=ml" className="hover:text-white transition-colors block py-0.5">Machine Learning</Link></li>
              <li><Link to="/jobs?category=pm" className="hover:text-white transition-colors block py-0.5">Product Manager</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base tracking-wide border-b-2 border-white/40 pb-1 inline-block">
              Get in Touch
            </h3>
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <p className="hover:text-white transition-colors break-all">support@campusbridge.com</p>
              <p className="hover:text-white transition-colors">+1 (555) 123-4567</p>
            </div>
    
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#6A38C2] transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5"/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#6A38C2] transition-all duration-300 shadow-sm" aria-label="Twitter">
                <Twitter className="w-5 h-5"/>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#6A38C2] transition-all duration-300 shadow-sm" aria-label="Facebook">
                <Facebook className="w-5 h-5"/>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm pt-8 text-gray-300 gap-4 text-center">
          <p>© {new Date().getFullYear()} CampusBridge. All rights reserved.</p>
          <div className='flex items-center space-x-3'>
            <Link to="/privacy-policy" className='hover:text-white transition-colors'>Privacy Policy</Link>
            <span className="text-white/40">•</span>
            <Link to="/terms" className='hover:text-white transition-colors'>Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer;