import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaBuilding, FaSearch, FaFilter } from 'react-icons/fa';

const JobSearch = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        jobType: '',
        minSalary: '',
        maxSalary: ''
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            Object.keys(filters).forEach(key => {
                if (filters[key]) params.append(key, filters[key]);
            });

            const { data } = await api.get(`/jobs?${params.toString()}`);
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    const clearFilters = () => {
        setFilters({
            keyword: '',
            location: '',
            jobType: '',
            minSalary: '',
            maxSalary: ''
        });
        setTimeout(fetchJobs, 100);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Jobs</h1>

                {/* Search and Filters */}
                <div className="card mb-8">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaSearch className="inline mr-2" />
                                    Keywords
                                </label>
                                <input
                                    type="text"
                                    name="keyword"
                                    value={filters.keyword}
                                    onChange={handleFilterChange}
                                    placeholder="Job title, skills, or company"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaMapMarkerAlt className="inline mr-2" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={filters.location}
                                    onChange={handleFilterChange}
                                    placeholder="City or state"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaBriefcase className="inline mr-2" />
                                    Job Type
                                </label>
                                <select
                                    name="jobType"
                                    value={filters.jobType}
                                    onChange={handleFilterChange}
                                    className="input-field"
                                >
                                    <option value="">All Types</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaDollarSign className="inline mr-2" />
                                    Min Salary
                                </label>
                                <input
                                    type="number"
                                    name="minSalary"
                                    value={filters.minSalary}
                                    onChange={handleFilterChange}
                                    placeholder="0"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Salary
                                </label>
                                <input
                                    type="number"
                                    name="maxSalary"
                                    value={filters.maxSalary}
                                    onChange={handleFilterChange}
                                    placeholder="200000"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="btn-primary">
                                <FaSearch className="inline mr-2" />
                                Search Jobs
                            </button>
                            <button type="button" onClick={clearFilters} className="btn-secondary">
                                Clear Filters
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-4">{jobs.length} jobs found</p>
                        <div className="grid gap-4">
                            {jobs.map((job) => (
                                <Link
                                    key={job._id}
                                    to={`/jobseeker/jobs/${job._id}`}
                                    className="card hover:shadow-lg transition-shadow"
                                >
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
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default JobSearch;
