import React from 'react';
import {Box, Button, FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
import PageHeader from "../PageHeader";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {colors} from "../../assets/styles/colors";
import {useLocation} from "react-router-dom";
import CustomSelect from '../CustomSelect';

const schema = yup.object().shape({
	ad: yup.string().required('Ads is required'),
	title: yup.string().required('Name of the lead magnet is required'),
	content: yup.string().required('Content is required'),
	propose: yup.string().required('Core Value Proposition is required'),
	format: yup.string().required('Format is required'),
	keyword: yup.string(),
	model: yup.string().required('AI model is required'),
});

const options = [
	{ value: 'gpt', label: 'Chat GPT' },
	{ value: 'claude', label: 'Claude' },
];

const AdsForm = ({createBenefits, setFormData, loading, setSteps,steps}) => {
	const location = useLocation();
	const ad = location?.state?.ad;

	const {control, reset, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			ad: ad || '',
			model: 'gpt',
			title: '',
			content: '',
			propose: '',
			format: '',
			keyword: '',
			personId: ''
		},
	});

	// const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());

	//
	// const persons = !isLoading ? data.map((p) => <MenuItem
	// 	key={p?.id}
	// 	value={p.id}
	// >{p?.fields?.Name}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	const ads = [
		{ label: "Facebook", value: 'facebook' },
		{ label: "Google", value: 'google' },
		{ label: "Instagram", value: 'instagram' },
		{ label: "LinkedIn", value: 'linkedin' },
		{ label: "X", value: 'x' },
		{ label: "Pinterest", value: 'pinterest' }
	];
	

	const onSubmit = async (data) => {
		setFormData(data);
		setSteps(null);
		setTimeout(() => setSteps(steps + 1), 350);
		await createBenefits(data);
	};

	const previousStepHandler = () => {
		reset()
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<PageHeader
				header={'Create Ads Benefits'}
				sx={{flexGrow: 1}}
			/>
			<Box sx={{display:'flex',flexDirection:'column', maxWidth:'200px'}}>
				<Typography
					variant={'span'}
					sx={{
						color: colors.white,
						mb:'10px'
					}}
					>Model*:
				</Typography>
				<Controller
					name="model"
					control={control}
					render={({ field }) => (
						<CustomSelect
							{...field}
							disabled={loading}
							options={options}
							label="Choose Model"
							onChange={(value) => field.onChange(value)}
							sx={{
								error: !!errors.model,
								width: '200px',
							}}
						/>
					)}
				/>
				{errors.model && (
					<Typography color="error">{errors.model.message}</Typography>
				)}
			</Box>
			{errors.model && <Typography color='error'>{errors.model.message}</Typography>}
			<Box
				sx={{
					marginBottom: '1rem',
					marginTop: '3rem',
					display: 'flex',
					alignItems: 'center',
					gap: '3rem'
				}}
			>
				{/*<Box sx={{width: '100%'}}>*/}
				{/*	<Typography*/}
				{/*		variant='subtitle1'*/}
				{/*		gutterBottom*/}
				{/*	>*/}
				{/*		Select Persona**/}
				{/*	</Typography>*/}
				{/*	<FormControl*/}
				{/*		fullWidth*/}
				{/*		variant='outlined'*/}
				{/*		sx={{mb: 2}}*/}
				{/*	>*/}
				{/*		<Controller*/}
				{/*			name='personId'*/}
				{/*			control={control}*/}
				{/*			render={({field}) => (*/}
				{/*				<Select*/}
				{/*					disabled={loading} {...field}*/}
				{/*					error={!!errors.personId}*/}
				{/*				>*/}
				{/*					<MenuItem value={``}>*/}
				{/*						<em>None</em>*/}
				{/*					</MenuItem>*/}
				{/*					{persons}*/}
				{/*				</Select>*/}
				{/*			)}*/}
				{/*		/>*/}
				{/*		{errors.personId && <Typography color='error'>{errors.personId.message}</Typography>}*/}
				{/*	</FormControl>*/}
				{/*</Box>*/}
				<Box sx={{width: '100%'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Select Ads*
					</Typography>
					<FormControl
						fullWidth
						variant='outlined'
						sx={{mb: 2}}
					>
						<Controller
							name='ad'
							control={control}
							render={({ field }) => (
								<CustomSelect
									{...field}
									disabled={loading || !!ad}
									options={ads}
									label="Choose Ads"
									onChange={(value) => field.onChange(value)}
								/>
							)}
						/>
						{errors.ad && <Typography color='error'>{errors.ad.message}</Typography>}
					</FormControl>
				</Box>
			</Box>
			<Box
				sx={{
					marginBottom: '1rem',
					// marginTop: '3rem',
					display: 'flex',
					alignItems: 'center',
					gap: '3rem'
				}}
			>
				<Box sx={{flex: '1 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Name of the lead magnet*
					</Typography>
					<Controller
						name='title'
						control={control}
						render={({field}) => (
							<TextField
								disabled={loading}
								{...field}
								variant='outlined'
								fullWidth
								error={!!errors.title}
								helperText={errors.title?.message}
								sx={{mb: 2}}
							/>
						)}
					/>
				</Box>
				<Box sx={{flex: '1 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Main keyword for SEO
					</Typography>
					<Controller
						name='keyword'
						control={control}
						render={({field}) => (
							<TextField
								disabled={loading}
								{...field}
								variant='outlined'
								fullWidth
								sx={{mb: 2}}
							/>
						)}
					/>
				</Box>
			</Box>
			<Typography
				variant='subtitle1'
				gutterBottom
			>
				What topic does the lead magnet cover?*
			</Typography>
			<Controller
				name='content'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						{...field}
						variant='outlined'
						fullWidth
						multiline
						rows={3}
						error={!!errors.content}
						helperText={errors.content?.message}
						sx={{mb: 2}}
					/>
				)}
			/>

			<Typography
				variant='subtitle1'
				gutterBottom
			>
				Core Value Proposition*
			</Typography>
			<Controller
				name='propose'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						{...field}
						variant='outlined'
						fullWidth
						multiline
						rows={3}
						error={!!errors.propose}
						helperText={errors.propose?.message}
						sx={{mb: 2}}
					/>
				)}
			/>

			<Typography
				variant='subtitle1'
				gutterBottom
			>
				Lead Magnet Format*
			</Typography>
			<Controller
				name='format'
				control={control}
				render={({field}) => (
					<TextField
						disabled={loading}
						{...field}
						variant='outlined'
						fullWidth
						error={!!errors.format}
						helperText={errors.format?.message}
						sx={{mb: 2}}
					/>
				)}
			/>
			<Button
				type='submit'
				variant='contained'
				color='primary'
				fullWidth
				// disabled={loading}
			>
				Submit
			</Button>
			<Button
				onClick={previousStepHandler}
				variant={'outlined'}
				color={'primary'}
				sx={{width: '100%', marginTop: '1rem'}}
				disabled={loading}
			>Previous step</Button>
		</Box>
	);
};

export default AdsForm;
