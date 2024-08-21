import React from 'react';
import {Box} from "@mui/material";
import NavigationLinks from "./NavigationLinks";

const Navigation = () => {
	return (
		<Box
			sx={{
				width: '20%',
				backgroundColor: "#231E39",
				padding: '30px 0'
			}}
		>
			<NavigationLinks />
		</Box>
	);
};

export default Navigation;
