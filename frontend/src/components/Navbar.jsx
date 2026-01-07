import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout, isEmployer, isJobSeeker } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
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
                                    to={isEmployer ? '/employer/dashboard' : '/jobseeker/dashboard'}
                                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                >
                                    <FaHome />
                                    <span>Dashboard</span>
                                </Link>

                                {isEmployer && (
                                    <>
                                        <Link
                                            to="/employer/post-job"
                                            className="text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            Post Job
                                        </Link>
                                        <Link
                                            to="/employer/manage-jobs"
                                            className="text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            Manage Jobs
                                        </Link>
                                    </>
                                )}

                                {isJobSeeker && (
                                    <>
                                        <Link
                                            to="/jobseeker/jobs"
                                            className="text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            Browse Jobs
                                        </Link>
                                        <Link
                                            to="/jobseeker/applications"
                                            className="text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            My Applications
                                        </Link>
                                        <Link
                                            to="/jobseeker/profile"
                                            className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                                        >
                                            <FaUser />
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
