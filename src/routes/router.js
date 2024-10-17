import React from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import Persons from "../pages/PersonsPage";
import NotFound from "../pages/404";
import MainLayout from "../layouts/Main";
import PersonDetailPage from "../pages/PersonDetailPage";
import ManagementPage from "../pages/ManagementPage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/LoginPage";
import CreatePage from "../pages/CreatePage";
import FormsPage from "../pages/FormsPage";
import ArticlesPage from "../pages/ArticlesPage";
import ProfilePage from "../pages/ProfilePage";
import AdminRoute from "./AdminRoute";
import UsersPage from "../pages/UsersPage";
import UserProfilePage from "../pages/UserProfilePage";
import PromptsPage from "../pages/PromptsPage";
import AdsPage from "../pages/AdsPage";
import CreateAdsPage from "../pages/CreateAdsPage";


const router = createBrowserRouter([
	{
		path: "/",
		element: <PrivateRoute component={MainLayout}/>,
		errorElement: <NotFound/>,
		children: [
			{
				index: true,
				element: <Navigate
					to='/persons'
					replace
				/>,
			},
			{
				path: "/persons",
				element: <Persons/>,
			},
			{
				path: "/persons/:id",
				element: <PersonDetailPage/>,
			},
			{
				path: "/management",
				element: <ManagementPage/>,
			},
			{
				path: "/create",
				element: <CreatePage/>,
			},
			{
				path: "/forms",
				element: <FormsPage/>
			},
			{
				path: "/articles",
				element: <ArticlesPage/>
			},
			{
				path: "/profile",
				element: <ProfilePage/>
			},
			{
				path: "/users",
				element: <AdminRoute component={UsersPage}/>
			},
			{
				path: "/ads/facebook",
				element: <AdsPage ad={'facebook'} />
			},
			{
				path: "/ads/google",
				element: <AdsPage ad={'google'} />
			},
			{
				path: "/ads/instagram",
				element: <AdsPage ad={'instagram'} />
			},
			{
				path: "/ads/linkedin",
				element: <AdsPage ad={'linkedin'} />
			},
			{
				path: "/ads/x",
				element: <AdsPage ad={'x'} />
			},
			{
				path: "/ads/pinterest",
				element: <AdsPage ad={'pinterest'} />
			},
			{
				path: "/ads/create",
				element: <CreateAdsPage />
			}
		]
	},
	{
		path: "/login",
		element: <LoginPage/>
	}
]);

window.addEventListener('logout', () => {
	router.navigate('/login');
});

export default router;
