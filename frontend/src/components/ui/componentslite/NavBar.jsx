import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button"; 
import { Popover, PopoverContent, PopoverTrigger } from "../popover"; 
import { Avatar, AvatarImage } from "../avatar"; 
import { LogOut, LayoutDashboard } from "lucide-react"; 

const PRIMARY_BRAND_COLOR = "#2563EB"; 
const ACCENT_BRAND_COLOR = "#FA4F09"; 

const NavBar = () => {
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
                
                <Link to="/" className="flex items-center gap-3 transition-all hover:opacity-90">
                    <img src="/bridge-logo.jpg" alt="Campus Bridge Logo" className="w-14 h-12 rounded-md" />
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        <span className="text-[#2563EB]">CAMPUS</span>
                        <span className="text-[#FA4F09] ml-0.5">BRIDGE</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-6">
                    
                    <ul className="flex font-medium items-center gap-8 text-gray-700">
                        {["Home", "Posts", "Jobs", "Internships"].map((item) => {
                            const linkPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            return (
                            <Link
                                key={item}
                                to={linkPath}
                                className="relative transition-all duration-200 hover:text-[#2563EB] group"
                            >
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#2563EB] transition-all group-hover:w-full rounded-full"></span>
                            </Link>
                            );
                        })}
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button className="bg-[#2563EB] text-white py-2 px-5 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-200">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-[#FA4F09] text-white py-2 px-5 rounded-lg font-semibold shadow hover:bg-[#E24407] transition duration-200">
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
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-white text-lg">{user.fullname || "User Name"}</h3>
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
            </div>
        </div>
    );
};

export default NavBar;