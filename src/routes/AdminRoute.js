import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const AdminRoute = ({ component: Component, ...rest }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <Loader />; // Можно заменить на компонент загрузки
	}

	if (!user || user.role !== 'super-admin') {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return <Component {...rest} />;
};

export default AdminRoute;
