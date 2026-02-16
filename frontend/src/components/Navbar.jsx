import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { FaBriefcase, FaUser, FaSignOutAlt, FaHome, FaBell, FaCommentDots, FaClock } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout, isEmployer, isJobSeeker, isAdmin } = useAuth();
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNotificationClick = (notification) => {
        markAsRead(notification._id);
        setShowNotifications(false);
        // Navigate based on role and notification context
        if (isEmployer) {
            navigate(`/employer/applicants/${notification.application.job._id}`);
        } else {
            navigate('/jobseeker/applications');
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <FaBriefcase className="text-primary-600 text-2xl" />
                        <span className="text-2xl font-bold text-gray-900">
                            Career<span className="text-primary-600">Bridge</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link
                                    to={isAdmin ? '/admin/dashboard' : isEmployer ? '/employer/dashboard' : '/jobseeker/dashboard'}
                                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                >
                                    <FaHome />
                                    <span>Dashboard</span>
                                </Link>

                                {/* Notification Bell */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
                                    >
                                        <FaBell size={20} />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                                            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                                                <h4 className="font-bold text-gray-800">Notifications</h4>
                                                {unreadCount > 0 && <span className="text-xs text-primary-600 font-medium">{unreadCount} unread</span>}
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-8 text-center text-gray-400">
                                                        <p className="text-sm">No notifications yet</p>
                                                    </div>
                                                ) : (
                                                    notifications.map((n) => (
                                                        <div
                                                            key={n._id}
                                                            onClick={() => handleNotificationClick(n)}
                                                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-primary-50/30' : ''}`}
                                                        >
                                                            <p className="text-sm font-semibold text-gray-900">{n.sender?.name}</p>
                                                            <p className="text-xs text-gray-600 truncate">{n.message}</p>
                                                            <p className="text-[10px] text-gray-400 mt-1">
                                                                {new Date(n.createdAt).toLocaleDateString()} at {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {isAdmin && (
                                    <>
                                        <Link
                                            to="/admin/users"
                                            className="text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            Manage Users
                                        </Link>
                                    </>
                                )}

                                {(isEmployer || isAdmin) && (
                                    <>
                                        <Link
                                            to={isAdmin ? "/admin/post-job" : "/employer/post-job"}
                                            className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            <FaBriefcase className="text-sm" />
                                            <span>Post Job</span>
                                        </Link>
                                        <Link
                                            to="/employer/manage-jobs"
                                            className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            <FaCommentDots className="text-sm" />
                                            <span>{isAdmin ? "Manage Platform Jobs" : "Manage Jobs"}</span>
                                        </Link>
                                    </>
                                )}

                                {(isJobSeeker || isAdmin) && (
                                    <>
                                        <Link
                                            to="/jobseeker/jobs"
                                            className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            <FaBriefcase className="text-sm" />
                                            <span>Browse Jobs</span>
                                        </Link>
                                    </>
                                )}

                                {isJobSeeker && (
                                    <>
                                        <Link
                                            to="/jobseeker/applications"
                                            className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            <FaClock className="text-sm" />
                                            <span>My Applications</span>
                                        </Link>
                                        <Link
                                            to="/jobseeker/profile"
                                            className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            <FaUser className="text-sm" />
                                            <span>Profile</span>
                                        </Link>
                                    </>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
