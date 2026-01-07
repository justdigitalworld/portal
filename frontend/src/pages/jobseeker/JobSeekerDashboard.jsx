import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaBuilding, FaClock } from 'react-icons/fa';

const JobSeekerDashboard = () => {
    const [recentJobs, setRecentJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [jobsRes, appsRes] = await Promise.all([
                api.get('/jobs?limit=5'),
                api.get('/applications/my-applications')
            ]);
            setRecentJobs(jobsRes.data.slice(0, 5));
            setApplications(appsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            Pending: 'badge badge-pending',
            Accepted: 'badge badge-accepted',
            Rejected: 'badge badge-rejected'
        };
        return badges[status] || 'badge';
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
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="card">
                        <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
                        <p className="text-3xl font-bold text-primary-600 mt-2">{applications.length}</p>
                    </div>
                    <div className="card">
                        <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {applications.filter(app => app.status === 'Pending').length}
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-gray-500 text-sm font-medium">Accepted</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {applications.filter(app => app.status === 'Accepted').length}
                        </p>
                    </div>
                </div>

                {/* Recent Jobs */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Job Openings</h2>
                        <Link to="/jobseeker/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
                            View All →
                        </Link>
                    </div>
                    <div className="grid gap-4">
                        {recentJobs.map((job) => (
                            <Link key={job._id} to={`/jobseeker/jobs/${job._id}`} className="card hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                            <span className="flex items-center gap-1">
                                                <FaBuilding /> {job.employer?.companyName || job.employer?.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt /> {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaBriefcase /> {job.jobType}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaDollarSign /> ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 line-clamp-2">{job.description}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <FaClock /> {new Date(job.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Applications */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">My Recent Applications</h2>
                        <Link to="/jobseeker/applications" className="text-primary-600 hover:text-primary-700 font-medium">
                            View All →
                        </Link>
                    </div>
                    {applications.length === 0 ? (
                        <div className="card text-center py-12">
                            <p className="text-gray-500 mb-4">You haven't applied to any jobs yet</p>
                            <Link to="/jobseeker/jobs" className="btn-primary">
                                Browse Jobs
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {applications.slice(0, 5).map((app) => (
                                <div key={app._id} className="card">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{app.job?.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {app.job?.employer?.companyName || app.job?.employer?.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={getStatusBadge(app.status)}>{app.status}</span>
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

export default JobSeekerDashboard;
