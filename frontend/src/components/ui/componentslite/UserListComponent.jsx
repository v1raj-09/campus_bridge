import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Trash2, Edit } from 'lucide-react';

const UserListComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token'); 

            try {
                const res = await fetch(`${BASE_URL}/api/admin/users`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch user list. Access may be restricted.');
                }

                const data = await res.json();
                
                const cleanedUsers = data.users.map(user => ({
                    ...user,
                    role: user.role.toLowerCase() === 'alumini' ? 'Alumni' : user.role,
                }));
                
                setUsers(cleanedUsers);
                setLoading(false);

            } catch (err) {
                console.error(err);
                setError("Error fetching user list. Check server logs."); 
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-[#6A38C2]">Loading users list...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 sm:p-6">
            
            {/* Header and Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">User List ({users.length})</h2>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 bg-[#6A38C2] text-white rounded-lg hover:bg-[#5A28A2] transition text-sm sm:text-base">
                    <UserPlus className="w-5 h-5 flex-shrink-0" />
                    <span>Add User</span>
                </button>
            </div>
            
            {/* Search Input */}
            <div className="mb-6 flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50">
                <Search className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                <input
                    type="text"
                    placeholder="Search by Name, Email or Role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base"
                />
            </div>
            
            {/* Users Table / Responsive Wrapper */}
            <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th> 
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <div className="flex items-center min-w-[150px]">
                                                <img 
                                                    className="h-8 w-8 rounded-full mr-3 object-cover border border-gray-200 flex-shrink-0" 
                                                    src={`${BASE_URL}${user.profile_photo}` || '/default-avatar.png'} 
                                                    alt={user.fullname} 
                                                    onError={(e) => { e.target.onerror = null; e.target.src="/default-avatar.png" }}
                                                />
                                                <span className="truncate">{user.fullname}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate">{user.email}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                user.role.toLowerCase() === 'alumni' ? 'bg-indigo-100 text-indigo-800' : 'bg-teal-100 text-teal-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">N/A</td> 
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active 
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex items-center justify-center gap-3">
                                                <button className="text-[#6A38C2] hover:text-[#5A28A2] transition p-1" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 transition p-1" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 text-sm">No users found matching your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserListComponent;