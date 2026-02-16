import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { isAuthenticated, loading, isAdmin } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
