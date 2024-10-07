import React from 'react';
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const AssistantSelector = ({value, onChange}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '1rem'
			}}
		>
			<Typography
				variant={'h6'}
				sx={{
					color: colors.white,
				}}
			>Model:</Typography>
			<FormControl
				sx={{
					width: '13rem'
				}}
			>
				<Select
					value={value}
					label='Assistant'
					onChange={onChange}
					defaultValue={'gpt'}
				>
					<MenuItem value={'gpt'}>Chat GPT</MenuItem>
					<MenuItem value={'claude'}>Claude</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default AssistantSelector;
