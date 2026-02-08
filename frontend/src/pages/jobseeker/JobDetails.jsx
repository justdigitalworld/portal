import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaBuilding, FaArrowLeft } from 'react-icons/fa';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const { data } = await api.get(`/jobs/${id}`);
            setJob(data);
        } catch (error) {
            console.error('Error fetching job:', error);
            setMessage({ type: 'error', text: 'Failed to load job details' });
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        setApplying(true);
        setMessage({ type: '', text: '' });

        try {
            await api.post('/applications', {
                jobId: id,
                coverLetter
            });
            setMessage({ type: 'success', text: 'Application submitted successfully!' });
            setCoverLetter('');
            setTimeout(() => navigate('/jobseeker/applications'), 2000);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to submit application'
            });
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
                    <button onClick={() => navigate('/jobseeker/jobs')} className="btn-primary">
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/jobseeker/jobs')}
                    className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
                >
                    <FaArrowLeft className="mr-2" /> Back to Jobs
                </button>

                <div className="card mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>

                    <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                        <span className="flex items-center gap-2">
                            <FaBuilding /> {job.employer?.companyName || job.employer?.name}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaMapMarkerAlt /> {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaBriefcase /> {job.jobType}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaDollarSign /> ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
                            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Qualifications</h2>
                            <p className="text-gray-700 whitespace-pre-line">{job.qualifications}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Responsibilities</h2>
                            <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>
                        </div>
                    </div>
                </div>

                {/* Apply Section */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply for this Position</h2>

                    {message.text && (
                        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleApply}>
                        <div className="mb-4">
                            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                                Cover Letter (Optional)
                            </label>
                            <textarea
                                id="coverLetter"
                                rows="6"
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="input-field"
                                placeholder="Tell the employer why you're a great fit for this role..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={applying}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {applying ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
