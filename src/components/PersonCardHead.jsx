import React from 'react';
import {Box, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const PersonCardHead = ({image, name, place}) => {
	return (
		<Box
			sx={{
				borderBottom: `1px solid ${colors.lightGray}`,
				paddingBottom: '1rem'
			}}
		>
			<Box
				sx={{
					border: `4px solid ${colors.orange}`,
					width: '88px',
					height: '88px',
					borderRadius: '50%',
					overflow: 'hidden',
					margin: '0 auto'
				}}
			>
				<Box
					component={'img'}
					alt={'user image'}
					src={image}
					sx={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)',}}
				/>
			</Box>
			<Typography
				variant='h5'
				marginTop={1}
				fontWeight={'bold'}
				sx={{color: colors.white}}
			>
				{name}
			</Typography>
			<Typography
				variant={'body1'}
			>
				{place}
			</Typography>
		</Box>
	);
};

export default PersonCardHead;
