import React, { useContext } from 'react'; // Fix here
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); // Fix here
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to='/signIn' state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
