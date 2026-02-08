import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { FaArrowLeft, FaEnvelope, FaPhone, FaFileAlt, FaCommentDots, FaPaperPlane } from 'react-icons/fa';
import MessageModal from '../../components/employer/MessageModal';
import OfferLetterModal from '../../components/employer/OfferLetterModal';

const JobApplicants = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);
    const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, [jobId]);

    const fetchData = async () => {
        try {
            const [jobRes, applicantsRes] = await Promise.all([
                api.get(`/jobs/${jobId}`),
                api.get(`/applications/job/${jobId}`)
            ]);
            setJob(jobRes.data);
            setApplicants(applicantsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (applicationId, newStatus) => {
        setUpdating(applicationId);
        try {
            await api.put(`/applications/${applicationId}/status`, { status: newStatus });
            setApplicants(applicants.map(app =>
                app._id === applicationId ? { ...app, status: newStatus } : app
            ));
        } catch (error) {
            alert('Failed to update application status');
            console.error('Error updating status:', error);
        } finally {
            setUpdating(null);
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
                <button
                    onClick={() => navigate('/employer/manage-jobs')}
                    className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
                >
                    <FaArrowLeft className="mr-2" /> Back to Jobs
                </button>

                <div className="card mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{job?.title}</h1>
                    <p className="text-gray-600">{applicants.length} applicants</p>
                </div>

                {applicants.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-500 text-lg">No applications yet for this job</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {applicants.map((app) => (
                            <div key={app._id} className="card">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {app.applicant?.name}
                                        </h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <FaEnvelope /> {app.applicant?.email}
                                            </p>
                                            {app.applicant?.phone && (
                                                <p className="flex items-center gap-2">
                                                    <FaPhone /> {app.applicant.phone}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-2">
                                                Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={getStatusBadge(app.status)}>{app.status}</span>
                                </div>

                                {/* Skills */}
                                {app.applicant?.skills && app.applicant.skills.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {app.applicant.skills.map((skill, index) => (
                                                <span key={index} className="badge bg-primary-100 text-primary-800">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Experience */}
                                {app.applicant?.experience && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Experience</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{app.applicant.experience}</p>
                                    </div>
                                )}

                                {/* Cover Letter */}
                                {app.coverLetter && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{app.coverLetter}</p>
                                    </div>
                                )}

                                {/* Resume */}
                                {app.applicant?.resume && (
                                    <div className="mb-4">
                                        <a
                                            href={`http://localhost:5000/${app.applicant.resume}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                                        >
                                            <FaFileAlt /> View Resume
                                        </a>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => updateStatus(app._id, 'Accepted')}
                                        disabled={updating === app._id || app.status === 'Accepted'}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        {app.status === 'Accepted' ? 'Accepted' : 'Accept'}
                                    </button>
                                    <button
                                        onClick={() => updateStatus(app._id, 'Rejected')}
                                        disabled={updating === app._id || app.status === 'Rejected'}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        {app.status === 'Rejected' ? 'Rejected' : 'Reject'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedApp(app);
                                            setIsMsgModalOpen(true);
                                        }}
                                        className="flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-200 transition-colors text-sm"
                                    >
                                        <FaCommentDots /> Message
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedApp(app);
                                            setIsOfferModalOpen(true);
                                        }}
                                        className="flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg font-medium hover:bg-secondary-200 transition-colors text-sm"
                                    >
                                        <FaPaperPlane /> Send Offer
                                    </button>
                                    {app.status !== 'Pending' && (
                                        <button
                                            onClick={() => updateStatus(app._id, 'Pending')}
                                            disabled={updating === app._id}
                                            className="btn-secondary text-sm"
                                        >
                                            Reset to Pending
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <MessageModal
                isOpen={isMsgModalOpen}
                onClose={() => setIsMsgModalOpen(false)}
                applicationId={selectedApp?._id}
                applicantName={selectedApp?.applicant?.name}
            />
            <OfferLetterModal
                isOpen={isOfferModalOpen}
                onClose={() => {
                    setIsOfferModalOpen(false);
                    fetchData(); // Refresh to see updated status
                }}
                applicationId={selectedApp?._id}
                applicantName={selectedApp?.applicant?.name}
                jobTitle={job?.title}
            />
        </div>
    );
};

export default JobApplicants;
