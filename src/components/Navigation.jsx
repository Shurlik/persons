import React from 'react';
import {Box} from "@mui/material";
import NavigationLinks from "./NavigationLinks";
import {colors} from "../assets/styles/colors";

const Navigation = () => {
	return (
		<Box
			sx={{
				backgroundColor: colors.black,
				padding: '30px 0'
			}}
		>
			<NavigationLinks />
		</Box>
	);
};

export default Navigation;
