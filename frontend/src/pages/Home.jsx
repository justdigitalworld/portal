import { Link } from 'react-router-dom';
import { FaBriefcase, FaSearch, FaUserTie, FaRocket } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Find Your Dream Job Today
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-primary-100">
                            Connect with top employers and discover opportunities that match your skills
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Get Started
                            </Link>
                            <Link to="/login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobPortal?</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary-100 p-4 rounded-full">
                                <FaSearch className="text-primary-600 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Easy Job Search</h3>
                        <p className="text-gray-600">
                            Search and filter thousands of jobs by location, salary, and job type
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="flex justify-center mb-4">
                            <div className="bg-secondary-100 p-4 rounded-full">
                                <FaUserTie className="text-secondary-600 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Top Employers</h3>
                        <p className="text-gray-600">
                            Connect with leading companies looking for talented professionals
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary-100 p-4 rounded-full">
                                <FaRocket className="text-primary-600 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Quick Apply</h3>
                        <p className="text-gray-600">
                            Apply to multiple jobs with one click and track your applications
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of job seekers and employers on our platform
                    </p>
                    <Link to="/register" className="btn-primary text-lg px-10 py-4">
                        Create Free Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
