import React from 'react';
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import {Controller} from "react-hook-form";
import useSWR from "swr";
import {getLeadMagnets} from "../../services/ads";

const AdsLeadMagnetSelector = ({control, errors, loading}) => {

	const {
		data = [],
		error,
		isLoading,
		mutate
	} = useSWR('/lm', getLeadMagnets);

	const items = data.map((o, i) => <MenuItem
		key={o.title + i}
		value={`Content: ${o.content}|||Proposition: ${o.proposition}|||Format: ${o.format}`}
	>{o.title}</MenuItem>);

	return (
		<Box sx={{width: '100%', marginTop: '1rem'}}>
			<Typography
				variant='subtitle1'
				gutterBottom
			>
				Select Lead Magnet
			</Typography>
			<FormControl
				fullWidth
				variant='outlined'
				sx={{mb: 2}}
			>
				<Controller
					name={'lm'}
					control={control}
					render={({field}) => (
						<Select
							disabled={loading} {...field}
							error={!!errors.lm}
						>
							<MenuItem value={``}>
								<em>None</em>
							</MenuItem>
							{items}
						</Select>
					)}
				/>
				{errors.lm && <Typography color='error'>{errors.lm.message}</Typography>}
			</FormControl>
		</Box>
	);
};

export default AdsLeadMagnetSelector;
