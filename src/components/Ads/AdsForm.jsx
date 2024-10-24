import React, {useState} from 'react';
import {Box, Button, FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
import PageHeader from "../PageHeader";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {colors} from "../../assets/styles/colors";
import {useLocation} from "react-router-dom";
import AdsLeadMagnetSelector from "./AdsLeadMagnetSelector";
import AdsOfferSelector from "./AdsOfferSelector";
import CustomSelect from "../CustomSelect";

const schema1 = yup.object().shape({
	ad: yup.string().required('Ads is required'),
	title: yup.string().required('Title is required'),
	content: yup.string().required('Content is required'),
	propose: yup.string().required('Core Value Proposition is required'),
	format: yup.string().required('Format is required'),
	keyword: yup.string(),
	model: yup.string().required('AI model is required'),
});

const schema2 = yup.object().shape({
	ad: yup.string().required('Ads is required'),
	title: yup.string().required('Title is required'),
	keyword: yup.string(),
	model: yup.string().required('AI model is required'),
});


const AdsForm = ({createBenefits, setFormData, loading, setSteps, steps, formData}) => {
	const location = useLocation();
	const ad = location?.state?.ad;

	const [variant, setVariant] = useState(''); //null | offer

	const {control, reset, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(!!variant ? schema2 : schema1),
		defaultValues: formData ? formData : {
			ad: ad || '',
			model: 'gpt',
			title: '',
			content: '',
			propose: '',
			format: '',
			keyword: '',
			personId: '',
			offer: '',
			lm: '',
			additionalInfo: '',
			offerOld: ''
		},
	});

	const ads = [
		{label: "Facebook", value: 'facebook'},
		{label: "Google", value: 'google'},
		{label: "Instagram", value: 'instagram'},
		{label: "LinkedIn", value: 'linkedin'},
		{label: "X", value: 'x'},
		{label: "Pinterest", value: 'pinterest'}
	];

	const onSubmit = async (data) => {
		setFormData(data);
		setSteps(null);
		setTimeout(() => setSteps(steps + 1), 350);
		await createBenefits(data);
	};

	const previousStepHandler = () => {
		reset();
		setFormData(null);
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	const options = [
		{value: 'gpt', label: 'Chat GPT'},
		{value: 'claude', label: 'Claude'},
	];

	const variants = [
		{value: '', label: 'Own Topic'},
		{value: 'offer', label: 'Offer'},
		{value: 'lm', label: 'Lead Magnet'},
	];

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<PageHeader
					header={'Create Ads Benefits'}
					// sx={{flexGrow: 1}}
				/>
				<Box>
					<Typography
						variant={'span'}
						sx={{
							color: colors.white,
						}}
					>Model: </Typography>
					<Controller
						name='model'
						control={control}
						render={({field}) => (
							<CustomSelect
								{...field}
								disabled={loading}
								options={options}
								label='Choose Model'
								onChange={(value) => field.onChange(value)}
								sx={{
									error: !!errors.model,
									width: '200px',
								}}
							/>
						)}
					/>
					{errors.model && <Typography color='error'>{errors.model.message}</Typography>}
				</Box>
			</Box>
			<Box
				sx={{
					marginBottom: '1rem',
					marginTop: '2rem',
					display: 'flex',
					alignItems: 'center',
					gap: '3rem'
				}}
			>
				<Box sx={{display: 'flex', gap: '1rem', width: '100%'}}>
					<Box sx={{flex: '1 1'}}>
						<Typography
							variant='subtitle1'
							gutterBottom
						>
							Select Ads*
						</Typography>
						<FormControl
							fullWidth
							variant='outlined'
							sx={{mb: 1}}
						>
							<Controller
								name='ad'
								control={control}
								render={({field}) => (
									<CustomSelect
										{...field}
										disabled={loading || !!ad}
										options={ads}
										label='Choose Ads'
										onChange={(value) => field.onChange(value)}
									/>
								)}
							/>
							{errors.ad && <Typography color='error'>{errors.ad.message}</Typography>}
						</FormControl>
					</Box>
					<Box sx={{flex: '2 1'}}>
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
									sx={{
										mb: 1,
										'& .MuiOutlinedInput-root': {
											'&.Mui-focused': {
												backgroundColor: 'white'
											}
										}
									}}
								/>
							)}
						/>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					marginBottom: '1rem',
					marginTop: '1rem',
					display: 'flex',
					alignItems: 'center',
					gap: '1rem'
				}}
			>
				<Box sx={{flex: '1 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Enter the Title*
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
								sx={{
									mb: 1,
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused': {
											backgroundColor: 'white'
										}
									}
								}}
							/>
						)}
					/>
				</Box>
				<Box sx={{flex: '1 1'}}>
					<Typography
						variant={'subtitle1'}
						sx={{
							color: colors.white,
						}}
					>Variant:</Typography>
					<CustomSelect
						disabled={loading}
						options={variants}
						value={variant}
						onChange={(event) => setVariant(event)}
					/>
					{/*<Select*/}
					{/*	sx={{width: '25rem'}}*/}
					{/*	value={variant}*/}
					{/*	onChange={(event) => setVariant(event.target.value)}*/}
					{/*	disabled={loading}*/}
					{/*	displayEmpty*/}
					{/*>*/}
					{/*	<MenuItem*/}
					{/*		value={``}*/}
					{/*	>Own Topic</MenuItem>*/}
					{/*	<MenuItem value={'offer'}>Offer</MenuItem>*/}
					{/*	<MenuItem value={'lm'}>Lead Magnet</MenuItem>*/}
					{/*</Select>*/}
				</Box>
			</Box>
			{variant === 'offer' && <Box>
				<AdsOfferSelector
					control={control}
					errors={errors}
					loading={loading}
				/>
			</Box>}
			{variant === 'lm' && <Box>
				<AdsLeadMagnetSelector
					control={control}
					errors={errors}
					loading={loading}
				/>
			</Box>}

			{!!variant && <>
				<Typography
					variant='subtitle1'
					gutterBottom
				>
					Additional information
				</Typography>
				<Controller
					name='additionalInfo'
					control={control}
					render={({field}) => (
						<TextField
							disabled={loading}
							{...field}
							variant='outlined'
							fullWidth
							multiline
							rows={3}
							error={!!errors.additionalInfo}
							helperText={errors.additionalInfo?.message}
							sx={{
								mb: 2,
								'& .MuiOutlinedInput-root': {
									'&.Mui-focused': {
										backgroundColor: 'white'
									}
								}
							}}
						/>
					)}
				/>
			</>}
			{!variant && <>

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
							sx={{
								mb: 2,
								'& .MuiOutlinedInput-root': {
									'&.Mui-focused': {
										backgroundColor: 'white'
									}
								}
							}}
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
							sx={{
								mb: 2,
								'& .MuiOutlinedInput-root': {
									'&.Mui-focused': {
										backgroundColor: 'white'
									}
								}
							}}
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
							sx={{
								'& .MuiOutlinedInput-root': {
									'&.Mui-focused': {
										backgroundColor: 'white'
									}
								}
							}}
							disabled={loading}
							{...field}
							variant='outlined'
							fullWidth
							error={!!errors.format}
							helperText={errors.format?.message}
						/>
					)}
				/>
			</>}
			<Box sx={{marginTop: '4rem'}}>
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
		</Box>
	);
};

export default AdsForm;
