import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FaBriefcase, FaUsers, FaClock, FaPlus } from 'react-icons/fa';

const EmployerDashboard = () => {
    const [stats, setStats] = useState({
        totalJobs: 0,
        activeJobs: 0,
        totalApplications: 0
    });
    const [recentJobs, setRecentJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await api.get('/jobs/employer/my-jobs');
            setRecentJobs(data.slice(0, 5));

            const activeJobs = data.filter(job => job.status === 'active').length;
            const totalApplications = data.reduce((sum, job) => sum + job.applicationsCount, 0);

            setStats({
                totalJobs: data.length,
                activeJobs,
                totalApplications
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
                    <Link to="/employer/post-job" className="btn-primary">
                        <FaPlus className="inline mr-2" />
                        Post New Job
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Jobs</h3>
                                <p className="text-3xl font-bold text-primary-600 mt-2">{stats.totalJobs}</p>
                            </div>
                            <FaBriefcase className="text-primary-600 text-4xl opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Active Jobs</h3>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeJobs}</p>
                            </div>
                            <FaClock className="text-green-600 text-4xl opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
                                <p className="text-3xl font-bold text-secondary-600 mt-2">{stats.totalApplications}</p>
                            </div>
                            <FaUsers className="text-secondary-600 text-4xl opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Recent Jobs */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Your Job Postings</h2>
                        <Link to="/employer/manage-jobs" className="text-primary-600 hover:text-primary-700 font-medium">
                            View All →
                        </Link>
                    </div>

                    {recentJobs.length === 0 ? (
                        <div className="card text-center py-12">
                            <p className="text-gray-500 mb-4">You haven't posted any jobs yet</p>
                            <Link to="/employer/post-job" className="btn-primary">
                                Post Your First Job
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {recentJobs.map((job) => (
                                <div key={job._id} className="card hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                                            <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                                <span>{job.location}</span>
                                                <span>{job.jobType}</span>
                                                <span className="flex items-center gap-1">
                                                    <FaUsers /> {job.applicationsCount} applicants
                                                </span>
                                            </div>
                                            <p className="text-gray-600 line-clamp-2">{job.description}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`badge ${job.status === 'active' ? 'badge-accepted' : 'badge-pending'}`}>
                                                {job.status}
                                            </span>
                                            <Link
                                                to={`/employer/applicants/${job._id}`}
                                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                            >
                                                View Applicants →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
