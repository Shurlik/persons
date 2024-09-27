import React from 'react';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navigation from "../components/Navigation";
import {colors} from "../assets/styles/colors";

const MainLayout = () => {
	return (

		<Box sx={{height: '100vh'}}>
			<Box sx={{
				backgroundColor: colors.background,
				borderBottom: `1px solid ${colors.lightGray}`
			}}><Navigation/></Box>
			<Box sx={{flexGrow: 1, overflow: 'auto', backgroundColor: colors.backgroundMain}}><Outlet/></Box>
		</Box>
	);
};

export default MainLayout;
