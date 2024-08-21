import React from 'react';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navigation from "../components/Navigation";

const MainLayout = () => {
	return (

		<Box sx={{display: 'flex', flex: 1, height: '100%'}}>
			<Navigation/>
			<Outlet/>
		</Box>
	);
};

export default MainLayout;
