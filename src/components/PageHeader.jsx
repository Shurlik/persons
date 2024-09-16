import React from 'react';
import {Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const PageHeader = ({header}) => {
	return (
		<Typography
			variant='h3'
			gutterBottom
			sx={{
				textAlign: 'left',
				mt: 2,
				fontWeight: 'bold',
				color: colors.white
			}}
		>
			{header}
		</Typography>
	);
};

export default PageHeader;
