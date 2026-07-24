import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button"; 
import { Popover, PopoverContent, PopoverTrigger } from "../popover"; 
import { Avatar, AvatarImage } from "../avatar"; 
import { LogOut, LayoutDashboard, Menu, X } from "lucide-react"; 

const PRIMARY_BRAND_COLOR = "#2563EB"; 
const ACCENT_BRAND_COLOR = "#FA4F09"; 

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const checkUser = () => {
        const userString = localStorage.getItem("user");
        if (userString) {
            try {
                setUser(JSON.parse(userString));
            } catch (e) {
                localStorage.removeItem("user");
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.replace("/login"); 
    };

    const getDashboardPath = () => {
        if (!user || !user.role) return "/profile"; 
        const role = user.role.toLowerCase();
        if (role === 'admin') return "/admin/dashboard"; 
        if (role === 'student') return "/student/dashboard";
        if (role === 'alumni' || role === 'alumini') return "/alumni/dashboard"; 
        return "/profile"; 
    };
    
    const dashboardPath = getDashboardPath();

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-md">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3 transition-all hover:opacity-90">
                    <img src="/bridge-logo.jpg" alt="Campus Bridge Logo" className="w-11 h-10 sm:w-14 sm:h-12 rounded-md object-cover" />
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                        <span className="text-[#2563EB]">CAMPUS</span>
                        <span className="text-[#FA4F09] ml-0.5">BRIDGE</span>
                    </h1>
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex font-medium items-center gap-6 lg:gap-8 text-gray-700">
                    {["Home", "Posts", "Jobs", "Internships"].map((item) => {
                        const linkPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                        return (
                            <Link
                                key={item}
                                to={linkPath}
                                className="relative transition-all duration-200 hover:text-[#2563EB] group text-sm lg:text-base"
                            >
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#2563EB] transition-all group-hover:w-full rounded-full"></span>
                            </Link>
                        );
                    })}
                </ul>

                {/* Desktop Right Action Area */}
                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button className="bg-[#2563EB] text-white py-2 px-5 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-200 text-sm">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-[#FA4F09] text-white py-2 px-5 rounded-lg font-semibold shadow hover:bg-[#E24407] transition duration-200 text-sm">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-10 h-10 ring-2 ring-gray-900 hover:ring-[#FA4F09]/60 transition-all duration-300">
                                    <AvatarImage src={user.profile_photo || "/default-avatar.png"} alt={user.fullname} />
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent 
                                className="w-80 p-1 shadow-2xl border-none rounded-lg bg-gray-900 text-white"
                                style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)' }}
                            >
                                <div className="flex items-center gap-3 p-6 border-b border-gray-700 mb-2">
                                    <Avatar className="w-12 h-12 ring-1 ring-gray-600">
                                        <AvatarImage src={user.profile_photo || "/default-avatar.png"} alt={user.fullname} />
                                    </Avatar>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-semibold text-white text-lg truncate">{user.fullname || "User Name"}</h3>
                                        <p className="text-sm text-gray-400 truncate">{user.email || "user@example.com"}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col p-4 space-y-3"> 
                                    <Link
                                        to={dashboardPath}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full px-3 py-4 bg-[#2563EB] text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-200"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>Dashboard</span>
                                    </Link>

                                    <Button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 w-full px-3 py-4 bg-[#FA4F09] text-white rounded-lg font-semibold shadow hover:bg-[#E24407] transition duration-200"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <div className="flex md:hidden items-center gap-2">
                    {user && (
                        <Avatar className="w-9 h-9 ring-2 ring-gray-900">
                            <AvatarImage src={user.profile_photo || "/default-avatar.png"} alt={user.fullname} />
                        </Avatar>
                    )}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-xl animate-fadeIn py-6 px-6 flex flex-col space-y-5">
                    {/* Navigation links */}
                    <ul className="flex flex-col space-y-4 font-medium text-gray-800 text-lg border-b border-gray-100 pb-5">
                        {["Home", "Posts", "Jobs", "Internships"].map((item) => {
                            const linkPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            return (
                                <Link
                                    key={item}
                                    to={linkPath}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-[#2563EB] transition-colors"
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </ul>

                    {/* Authentication or User Profile Actions */}
                    {!user ? (
                        <div className="flex flex-col gap-3 pt-2">
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-[#FA4F09] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#E24407] transition">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-3 pt-2">
                            <div className="flex items-center gap-3 px-1 pb-2">
                                <Avatar className="w-10 h-10 ring-1 ring-gray-200">
                                    <AvatarImage src={user.profile_photo || "/default-avatar.png"} alt={user.fullname} />
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm truncate">{user.fullname || "User Name"}</h4>
                                    <p className="text-xs text-gray-500 truncate">{user.email || "user@example.com"}</p>
                                </div>
                            </div>
                            
                            <Link
                                to={dashboardPath}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-[#2563EB] text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                <span>Dashboard</span>
                            </Link>

                            <Button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleLogout();
                                }}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-[#FA4F09] text-white rounded-xl font-semibold shadow hover:bg-[#E24407] transition"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavBar;