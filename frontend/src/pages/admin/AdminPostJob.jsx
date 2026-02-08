import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const AdminPostJob = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        qualifications: '',
        responsibilities: '',
        jobType: 'Full-time',
        location: '',
        minSalary: '',
        maxSalary: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const jobData = {
                ...formData,
                salaryRange: {
                    min: Number(formData.minSalary),
                    max: Number(formData.maxSalary)
                }
            };
            delete jobData.minSalary;
            delete jobData.maxSalary;

            await api.post('/jobs', jobData);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Post a New Job (Admin)</h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title *
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g. Senior Software Engineer"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Job Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Describe the job role..."
                            />
                        </div>

                        <div>
                            <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-2">
                                Qualifications *
                            </label>
                            <textarea
                                id="qualifications"
                                name="qualifications"
                                rows="4"
                                required
                                value={formData.qualifications}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Required qualifications..."
                            />
                        </div>

                        <div>
                            <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-2">
                                Responsibilities *
                            </label>
                            <textarea
                                id="responsibilities"
                                name="responsibilities"
                                rows="4"
                                required
                                value={formData.responsibilities}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Key responsibilities..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
                                    Job Type *
                                </label>
                                <select
                                    id="jobType"
                                    name="jobType"
                                    required
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. New York, NY"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700 mb-2">
                                    Minimum Salary (₹) *
                                </label>
                                <input
                                    id="minSalary"
                                    name="minSalary"
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.minSalary}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="50000"
                                />
                            </div>

                            <div>
                                <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700 mb-2">
                                    Maximum Salary (₹) *
                                </label>
                                <input
                                    id="maxSalary"
                                    name="maxSalary"
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.maxSalary}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="100000"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/dashboard')}
                                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPostJob;
