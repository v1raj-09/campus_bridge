import React from "react";
import { Button } from "../button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative bg-gradient-to-br from-[#E8F0FF] via-[#F8FAFF] to-white text-center py-24 px-6 overflow-hidden">
      
      {/* 🌈 Subtle Decorative Blurs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-150"></div>
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>

      {/* ✨ Animated Headings */}
      <motion.h1
        className="text-4xl md:text-6xl mt-24 font-extrabold leading-snug text-gray-900 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Find Your{" "}
        <span className="text-[#2563EB]">
          Dream Job
        </span>{" "}
        &
      </motion.h1>

      <motion.h1
        className="mt-4 md:mt-6 text-3xl md:text-5xl font-extrabold text-gray-900 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Shape Your Future With Our{" "}
        <span className="text-[#0891B2]">
          Alumni Network
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="mt-6 text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Start your journey towards career success — discover new roles, connect with alumni, and unlock your professional future.
      </motion.p>

      {/* 🔍 Search Bar */}
      <motion.div
        className="relative z-10 mt-12 flex items-center justify-between w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#2563EB]/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {/* Input Field */}
        <div className="flex items-center w-full px-5 py-3">
          <Search className="h-5 w-5 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search job title, skills, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-gray-800 placeholder-gray-500 bg-transparent outline-none text-lg"
          />
        </div>

        {/* Search Button */}
        <Button className="rounded-xl bg-[#2563EB] hover:bg-[#1E40AF] px-6 py-3 m-1 text-white font-semibold shadow-sm transition-all duration-300">
          Search
        </Button>
      </motion.div>
    </div>
  );
};

export default Header;
