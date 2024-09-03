import React from 'react';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navigation from "../components/Navigation";
import {colors} from "../assets/styles/colors";

const MainLayout = () => {
	return (

		<Box sx={{display: 'flex', height: '100vh'}}>
			<Box sx={{height: '100%', display: 'flex'}}><Navigation/></Box>
			<Box sx={{flexGrow: 1, overflow: 'auto', backgroundColor: colors.darkGrey}}><Outlet/></Box>
		</Box>
	);
};

export default MainLayout;
