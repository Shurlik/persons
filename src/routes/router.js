import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import Persons from "../pages/PersonsPage";
import NotFound from "../pages/404";
import MainLayout from "../layouts/Main";
import PersonDetailPage from "../pages/PersonDetailPage";
import ManagementPage from "../pages/ManagementPage";
import Creation from "../pages/CreationPage";


export default createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		errorElement: <NotFound/>,
		children: [
			{
				index: true,
				element: <Navigate to="/persons" replace />,
			},
			{
				path: "/persons",
				element: <Persons/>,
			},
			{
				path: "/persons/:person",
				element: <PersonDetailPage/>,
			},
			{
				path: "/management",
				element: <ManagementPage/>,
			},
			{
				path: "/create",
				element: <Creation/>,
			}
		]
	}
]);
