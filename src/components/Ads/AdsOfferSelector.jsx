import React from 'react';
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import {Controller} from "react-hook-form";
import useSWR from "swr";
import {getOffers} from "../../services/ads";

const AdsOfferSelector = ({control, errors, loading}) => {

	const {
		data = [],
		error,
		isLoading,
		mutate
	} = useSWR('/offers', getOffers);

	const items = data.map((o, i) => <MenuItem
		key={o.title + i}
		value={o.title}
	>{o.title}</MenuItem>);

	return (
		<Box sx={{width: '100%', marginTop: '1rem'}}>
			<Typography
				variant='subtitle1'
				gutterBottom
			>
				Select Offer
			</Typography>
			<FormControl
				fullWidth
				variant='outlined'
				sx={{mb: 2}}
			>
				<Controller
					name={'offerOld'}
					control={control}
					render={({field}) => (
						<Select
							disabled={loading} {...field}
							error={!!errors.offer}
						>
							<MenuItem value={``}>
								<em>None</em>
							</MenuItem>
							{items}
						</Select>
					)}
				/>
				{errors.offer && <Typography color='error'>{errors.offer.message}</Typography>}
			</FormControl>
		</Box>
	);
};

export default AdsOfferSelector;
