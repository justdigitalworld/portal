import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FaEdit, FaTrash, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const { data } = await api.get('/jobs/employer/my-jobs');
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            return;
        }

        setDeleting(jobId);
        try {
            await api.delete(`/jobs/${jobId}`);
            setJobs(jobs.filter(job => job._id !== jobId));
        } catch (error) {
            alert('Failed to delete job');
            console.error('Error deleting job:', error);
        } finally {
            setDeleting(null);
        }
    };

    const toggleStatus = async (job) => {
        try {
            const newStatus = job.status === 'active' ? 'inactive' : 'active';
            await api.put(`/jobs/${job._id}`, { status: newStatus });
            setJobs(jobs.map(j => j._id === job._id ? { ...j, status: newStatus } : j));
        } catch (error) {
            alert('Failed to update job status');
            console.error('Error updating status:', error);
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
                    <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
                    <Link to="/employer/post-job" className="btn-primary">
                        Post New Job
                    </Link>
                </div>

                {jobs.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">You haven't posted any jobs yet</p>
                        <Link to="/employer/post-job" className="btn-primary">
                            Post Your First Job
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {jobs.map((job) => (
                            <div key={job._id} className="card">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt /> {job.location}
                                            </span>
                                            <span>{job.jobType}</span>
                                            <span>${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}</span>
                                            <span className="flex items-center gap-1">
                                                <FaUsers /> {job.applicationsCount} applicants
                                            </span>
                                        </div>
                                        <p className="text-gray-600 line-clamp-2">{job.description}</p>
                                    </div>
                                    <span className={`badge ${job.status === 'active' ? 'badge-accepted' : 'badge-pending'}`}>
                                        {job.status}
                                    </span>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <Link
                                        to={`/employer/applicants/${job._id}`}
                                        className="btn-primary text-sm"
                                    >
                                        <FaUsers className="inline mr-1" />
                                        View Applicants ({job.applicationsCount})
                                    </Link>

                                    <button
                                        onClick={() => toggleStatus(job)}
                                        className="btn-secondary text-sm"
                                    >
                                        {job.status === 'active' ? 'Deactivate' : 'Activate'}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        disabled={deleting === job._id}
                                        className="text-red-600 hover:text-red-700 px-4 py-2 text-sm font-medium disabled:opacity-50"
                                    >
                                        <FaTrash className="inline mr-1" />
                                        {deleting === job._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageJobs;
