import React from 'react';
import {Box, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const CreateOffersPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Typography
				variant={'h5'}
				sx={{whiteSpace: 'pre-wrap', color: colors.blackPermanet, textAlign: 'center'}}
			>
				{'Create Offers Page\nWe are working on it!'}
			</Typography>
		</Box>
	);
};

export default CreateOffersPage;
