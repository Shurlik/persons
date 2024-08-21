import React from "react";
import {Navigate} from "react-router-dom";
import {getTokens} from "../services/storage";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
	let isAuthenticated = false;
	const data = getTokens();
	if (data?.token && new Date().getTime() / 1000 < jwtDecode(data.token).exp) {
		isAuthenticated = true;
	}

	return isAuthenticated ? <Component {...rest} /> : <Navigate
		to='/login'
		replace
	/>;
};
export default PrivateRoute;
