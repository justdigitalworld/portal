import { useState } from 'react';
import { FaTimes, FaFileAlt } from 'react-icons/fa';
import api from '../../utils/api';

const OfferLetterModal = ({ isOpen, onClose, applicationId, applicantName, jobTitle }) => {
    const [formData, setFormData] = useState({
        content: `Dear ${applicantName},\n\nWe are pleased to offer you the position of ${jobTitle} at our company. We were very impressed with your skills and experience.\n\nPlease find the details of your offer below.`,
        salary: '',
        joiningDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/applications/${applicationId}/offer`, formData);
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 2000);
        } catch (error) {
            console.error('Error sending offer letter:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-secondary-600 text-white">
                    <div className="flex items-center space-x-3">
                        <FaFileAlt size={24} />
                        <div>
                            <h3 className="text-xl font-bold">Send Offer Letter</h3>
                            <p className="text-sm opacity-80">Candidate: {applicantName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>

                {success ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-bold text-slate-800 mb-2">Offer Sent!</h4>
                        <p className="text-slate-600">The candidate will be notified immediately.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Offer Details & Letter Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="6"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary-600 outline-none resize-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Salary (e.g. $80,000)</label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="Enter salary"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary-600 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Joining Date</label>
                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={formData.joiningDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary-600 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-secondary-600 text-white font-bold rounded-xl hover:bg-secondary-700 transition-all shadow-lg shadow-secondary-500/25 disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Offer Letter'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OfferLetterModal;
