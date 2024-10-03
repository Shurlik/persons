import React from 'react';
import {Container, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const EmptyComponent = () => {
	return (
		<Container
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Typography
				variant={'h2'}
				sx={{
					color: colors.gray40
				}}
			>No data found</Typography>
		</Container>
	);
};

export default EmptyComponent;
