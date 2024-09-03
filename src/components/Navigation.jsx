import React from 'react';
import {Box, Typography} from "@mui/material";
import NavigationLinks from "./NavigationLinks";
import {colors} from "../assets/styles/colors";
import packageJson from '../../package.json';
import {LINK} from '../services/variables'

const Navigation = () => {
	return (
		<Box
			sx={{
				backgroundColor: colors.black,
				padding: '30px 0',
			}}
		>
			<NavigationLinks/>
			<Typography
				sx={{
					color: colors.silver30,
					textAlign: 'center'
				}}
			>Version: {packageJson.version} {'<>'} Server: {LINK === 'http://localhost:8080'? 'Local': 'Remote'}</Typography>
		</Box>
	);
};

export default Navigation;
