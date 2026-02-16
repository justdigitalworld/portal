import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserPlus, FaBriefcase, FaUsers, FaChartLine, FaBuilding, FaClipboardList, FaArrowRight, FaCommentDots } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [recentJobs, setRecentJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data.stats);
                setRecentJobs(data.recentJobs);
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Users', value: stats?.totalUsers, icon: <FaUsers />, color: 'from-blue-600 to-indigo-600' },
        { title: 'Registered Companies', value: stats?.totalCompanies, icon: <FaBuilding />, color: 'from-emerald-500 to-teal-600' },
        { title: 'Active Jobs', value: stats?.totalJobs, icon: <FaBriefcase />, color: 'from-amber-500 to-orange-600' },
        { title: 'Total Applications', value: stats?.totalApplications, icon: <FaClipboardList />, color: 'from-purple-500 to-pink-600' },
        { title: 'Platform Revenue', value: `₹${stats?.revenue?.toLocaleString()}`, icon: <FaChartLine />, color: 'from-rose-500 to-red-600' },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">Admin Control Center</h1>
                        <p className="text-lg text-slate-600">Welcome back, <span className="text-primary-600 font-bold">{user?.name}</span>. Here's what's happening today.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/admin/post-job" className="btn-primary flex items-center gap-2">
                            <FaBriefcase /> Post Platform Job
                        </Link>
                        <Link to="/employer/manage-jobs" className="bg-primary-100 text-primary-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all border border-primary-200 flex items-center gap-2">
                            <FaCommentDots /> Manage Jobs & Chats
                        </Link>
                        <Link to="/admin/add-jobseeker" className="bg-white text-slate-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:shadow-md transition-all border border-slate-200 flex items-center gap-2">
                            <FaUserPlus /> Add User
                        </Link>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                    {statCards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`bg-gradient-to-br ${card.color} p-6 rounded-3xl text-white shadow-xl shadow-indigo-500/10`}
                        >
                            <div className="text-white/80 mb-4 text-2xl">{card.icon}</div>
                            <div className="text-3xl font-black mb-1">{card.value}</div>
                            <div className="text-sm font-bold text-white/90 uppercase tracking-wider">{card.title}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center text-slate-900">
                                <h2 className="text-2xl font-black">Recent Job Postings</h2>
                                <Link to="/admin/users" className="text-primary-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    View All Activity <FaArrowRight />
                                </Link>
                            </div>
                            <div className="p-0">
                                {recentJobs.length === 0 ? (
                                    <div className="p-12 text-center text-slate-400">No recent activity</div>
                                ) : (
                                    <div className="divide-y divide-slate-50">
                                        {recentJobs.map((job) => (
                                            <div key={job._id} className="p-6 hover:bg-slate-50/50 transition-colors flex justify-between items-center group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                                                        {job.title[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-primary-600 transition-colors">{job.title}</h4>
                                                        <p className="text-sm text-slate-500">{job.employer?.companyName || job.employer?.name} • {job.location}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-slate-700">₹{job.salaryRange ? `${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}` : 'N/A'}</div>
                                                    <div className="text-xs text-slate-400">{new Date(job.createdAt).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Access / Reports */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                            <h3 className="text-xl font-black text-slate-900 mb-6">Quick Reports</h3>
                            <div className="space-y-4">
                                <Link to="/admin/users" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-primary-50 hover:text-primary-700 transition-all border border-transparent hover:border-primary-100 group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg group-hover:text-primary-600 transition-colors"><FaUsers /></div>
                                        <span className="font-bold">User Audit</span>
                                    </div>
                                    <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-primary-50 hover:text-primary-700 transition-all border border-transparent hover:border-primary-100 group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg group-hover:text-primary-600 transition-colors"><FaChartLine /></div>
                                        <span className="font-bold">Export Revenue CSV</span>
                                    </div>
                                    <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Need Support?</h3>
                                <p className="text-slate-400 text-sm mb-6">Access our admin documentation or contact technical support.</p>
                                <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg">
                                    Documentation
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
