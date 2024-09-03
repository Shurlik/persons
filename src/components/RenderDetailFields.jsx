import React from 'react';
import {Box, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";

const RenderDetailFields = ({sectionTitle, fields, selectedPerson}) => {
	return (
		<Box key={sectionTitle}>
			<Typography
				variant='h6'
				sx={{mt: 2, mb: 1, color: colors.pink}}
			>
				{sectionTitle}
			</Typography>
			{fields.map(field => (
				<Box key={field}>
					<Typography
						variant='subtitle1'
						sx={{fontWeight: 'bold'}}
					>
						{field}:
					</Typography>
					<Typography variant='body1'>
						{selectedPerson.fields[field] || 'Not specified'}
					</Typography>
				</Box>
			))}
		</Box>
	);
};

export default RenderDetailFields;
