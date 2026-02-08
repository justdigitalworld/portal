import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FaBuilding, FaMapMarkerAlt, FaClock, FaCommentDots, FaGift } from 'react-icons/fa';
import MessageModal from '../../components/employer/MessageModal';
import OfferDetailModal from '../../components/jobseeker/OfferDetailModal';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);
    const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data } = await api.get('/applications/my-applications');
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
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
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

                {applications.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">You haven't applied to any jobs yet</p>
                        <a href="/jobseeker/jobs" className="btn-primary">
                            Browse Jobs
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {applications.map((app) => (
                            <div key={app._id} className="card">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {app.job?.title || 'Job Deleted'}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <FaBuilding /> {app.job?.employer?.companyName || app.job?.employer?.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt /> {app.job?.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaClock /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={getStatusBadge(app.status)}>{app.status}</span>
                                </div>

                                {app.coverLetter && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{app.coverLetter}</p>
                                    </div>
                                )}

                                <div className="flex gap-4 mt-6 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => {
                                            setSelectedApp(app);
                                            setIsMsgModalOpen(true);
                                        }}
                                        className="flex items-center gap-2 bg-primary-50 text-primary-700 px-6 py-2.5 rounded-xl font-bold hover:bg-primary-100 transition-all text-sm"
                                    >
                                        <FaCommentDots /> Chat with Employer
                                    </button>

                                    {app.offerLetter && (
                                        <button
                                            onClick={() => {
                                                setSelectedApp(app);
                                                setIsOfferModalOpen(true);
                                            }}
                                            className="flex items-center gap-2 bg-secondary-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-secondary-700 transition-all shadow-lg shadow-secondary-500/25 text-sm"
                                        >
                                            <FaGift /> View Offer
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
                applicantName={selectedApp?.job?.employer?.companyName || selectedApp?.job?.employer?.name}
            />
            <OfferDetailModal
                isOpen={isOfferModalOpen}
                onClose={() => setIsOfferModalOpen(false)}
                application={selectedApp}
                onUpdate={fetchApplications}
            />
        </div>
    );
};

export default MyApplications;
