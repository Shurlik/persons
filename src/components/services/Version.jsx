import React from 'react';
import packageJson from '../../../package.json';
import {LINK} from '../../services/variables';
import {Box, Typography} from "@mui/material";
import {colors} from "../../assets/styles/colors";

const serverType = LINK === 'http://localhost:8080' ? 'Local' : 'Remote';

const Version = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				bottom: '10px',
				right: '10px',

			}}
		>
			<Typography sx={{color: colors.lightGray}}>{`v.${packageJson.version}\n\n${serverType}`}</Typography>
		</Box>
	);
};

export default Version;
