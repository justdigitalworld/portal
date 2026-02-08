import { useState } from 'react';
import { FaTimes, FaFileAlt, FaCheck, FaTimes as FaDecline } from 'react-icons/fa';
import api from '../../utils/api';

const OfferDetailModal = ({ isOpen, onClose, application, onUpdate }) => {
    const [loading, setLoading] = useState(false);

    const handleAction = async (action) => {
        setLoading(true);
        try {
            // In a real app, we might have a specific endpoint for this
            // For now, let's assume the status update endpoint handles it or we add a new one
            // Let's just update the status for simplicity in this demo
            await api.put(`/applications/${application._id}/status`, {
                status: action === 'Accepted' ? 'Accepted' : 'Rejected'
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error responding to offer:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !application?.offerLetter) return null;

    const { offerLetter } = application;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-secondary-600 text-white">
                    <div className="flex items-center space-x-3">
                        <FaFileAlt size={24} />
                        <div>
                            <h3 className="text-xl font-bold">Job Offer</h3>
                            <p className="text-sm opacity-80">{application.job?.title} at {application.job?.employer?.companyName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="p-8">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 max-h-60 overflow-y-auto">
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                            {offerLetter.content}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                            <span className="block text-xs font-bold text-primary-600 uppercase mb-1">Offered Salary</span>
                            <span className="text-2xl font-black text-slate-800">{offerLetter.salary || 'Not specified'}</span>
                        </div>
                        <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                            <span className="block text-xs font-bold text-primary-600 uppercase mb-1">Joining Date</span>
                            <span className="text-2xl font-black text-slate-800">
                                {offerLetter.joiningDate ? new Date(offerLetter.joiningDate).toLocaleDateString() : 'TBD'}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => handleAction('Declined')}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-all"
                        >
                            <FaDecline /> Decline Offer
                        </button>
                        <button
                            onClick={() => handleAction('Accepted')}
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-500/25"
                        >
                            <FaCheck /> Accept Offer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferDetailModal;
