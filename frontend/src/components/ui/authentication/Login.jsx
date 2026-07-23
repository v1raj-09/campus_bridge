import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Added BASE_URL definition for both local and production
// Donhi files madhye BASE_URL asa define kara:
const BASE_URL = import.meta.env.MODE === 'production' ? "" : (import.meta.env.VITE_API_URL || "");

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "Student", // Default role    
    });
    const [error, setError] = useState("");

    const changeInputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                const userToSave = { ...data.user };

                if (userToSave.profile_photo && !userToSave.profile_photo.startsWith("http")) {
                    userToSave.profile_photo = `${BASE_URL}${userToSave.profile_photo}`;
                }

                localStorage.setItem("user", JSON.stringify(userToSave));
                alert("Login Successful!");
                navigate('/');
            } else {
                setError(data.message || "Invalid login credentials");
            }
        } catch (err) {
            console.error("Frontend Error (Network or Server):", err);
            setError("Server error, try again later.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* LEFT SIDE: Blue Background */}
            <div className="w-1/2 bg-blue-800 text-white flex flex-col justify-center items-center p-10">
                <img src="/bridge-logo.jpg" alt="Logo" className="w-32 mb-6" />
                <h1 className="text-3xl font-bold mb-3">Welcome Back!</h1>
                <p className="text-sm text-blue-200">
                    Login with your enrollment number/email and password to continue.
                </p>
            </div>

            {/* RIGHT SIDE (Form Card) - Centered */}
            <div className="w-1/2 flex flex-col justify-center items-center">
                <div className="w-full max-w-sm bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src="/rmcetlogo1.jpg"
                            alt="RMCET Logo"
                            className="w-16 h-16 mb-2"
                        />
                        <h1 className="text-xl font-bold text-gray-800 tracking-wide mt-1">
                            Student Placement Portal
                        </h1>
                        <p className="text-sm text-gray-500 text-center">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label htmlFor="enrollment" className="text-sm font-medium text-gray-700"> Email</label>
                            <input
                                id="enrollment"
                                type="text"
                                name="email"
                                value={input.email}
                                onChange={changeInputHandler}
                                placeholder="Enter Enrollment Number or Email"
                                required
                                className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50/70 border-blue-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeInputHandler}
                                placeholder="********"
                                required
                                className="w-full mt-1 p-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50/70 border-blue-200"
                            />
                        </div>

                        <div className="pt-2">
                            <label className="text-sm font-medium text-gray-700">Role</label>
                            <div className="flex gap-6 mt-2 text-sm">
                                {["Student", "Alumni", "Admin"].map((role) => (
                                    <label key={role} className="flex items-center gap-1 text-gray-700">
                                        <input
                                            type="radio"
                                            name="role"
                                            value={role}
                                            checked={input.role === role}
                                            onChange={changeInputHandler}
                                            className="form-radio text-blue-600"
                                        />
                                        {role}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900 transition duration-150 shadow-md mt-6"
                        >
                            Login
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
                            Forgot password?
                        </Link>
                    </div>

                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-700 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;