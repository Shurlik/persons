import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";


const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <div>Loading...</div>; // Можно заменить на компонент загрузки
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Component {...rest} />;
};
export default PrivateRoute;
