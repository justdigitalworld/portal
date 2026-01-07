import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Job Seeker pages
import JobSeekerDashboard from './pages/jobseeker/JobSeekerDashboard';
import JobSearch from './pages/jobseeker/JobSearch';
import JobDetails from './pages/jobseeker/JobDetails';
import MyApplications from './pages/jobseeker/MyApplications';
import Profile from './pages/jobseeker/Profile';

// Employer pages
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import ManageJobs from './pages/employer/ManageJobs';
import JobApplicants from './pages/employer/JobApplicants';

function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route
                path="/login"
                element={user ? <Navigate to={user.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'} /> : <Login />}
            />
            <Route
                path="/register"
                element={user ? <Navigate to={user.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'} /> : <Register />}
            />

            {/* Job Seeker Routes */}
            <Route
                path="/jobseeker/dashboard"
                element={
                    <ProtectedRoute role="jobseeker">
                        <JobSeekerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/jobseeker/jobs"
                element={
                    <ProtectedRoute role="jobseeker">
                        <JobSearch />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/jobseeker/jobs/:id"
                element={
                    <ProtectedRoute role="jobseeker">
                        <JobDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/jobseeker/applications"
                element={
                    <ProtectedRoute role="jobseeker">
                        <MyApplications />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/jobseeker/profile"
                element={
                    <ProtectedRoute role="jobseeker">
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* Employer Routes */}
            <Route
                path="/employer/dashboard"
                element={
                    <ProtectedRoute role="employer">
                        <EmployerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employer/post-job"
                element={
                    <ProtectedRoute role="employer">
                        <PostJob />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employer/manage-jobs"
                element={
                    <ProtectedRoute role="employer">
                        <ManageJobs />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employer/applicants/:jobId"
                element={
                    <ProtectedRoute role="employer">
                        <JobApplicants />
                    </ProtectedRoute>
                }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <AppRoutes />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
