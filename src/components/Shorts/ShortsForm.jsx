import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, FormControl, MenuItem, Select, TextField, Typography} from "@mui/material";
import {toast} from "react-toastify";
import PageHeader from "../PageHeader";
import Loader from "../Loader";
import useSWR from "swr";
import {getArticles} from "../../services/airtable";

const ShortsForm = ({loading, setFormData, createShorts, steps, setSteps, selectedValues, person}) => {
	const location = useLocation();
	const articleId = location?.state?.articleId;
	const [showOptions, setShowOptions] = useState(false);

	const {data = [], error, isLoading, mutate} = useSWR(articleId ? null : '/cos/articles', () => getArticles());

	const articles = !articleId ?
		!isLoading
			? data?.articles.map((p) => <MenuItem
				key={p?.id}
				value={p?.id}
			>{p?.fields?.['Blog Title']}</MenuItem>)
			: <MenuItem value={null}><Loader/></MenuItem>
		: null;

	const schema = yup.object().shape({
		textStyle: yup.string().required('Required'),
		briefing: yup.string().required('Required'),
		briefingTextStyle: yup.string().required('Required'),
		designation: yup.string().required('Required'),
		designationTextStyle: yup.string().required('Required'),
		personAction: yup.string().required('Required'),
		model: yup.string().required('AI model is required'),
	});

	const actionsList = ['Comment', 'Like and subscribe', 'Get the Lead magnet', 'Learn about an offer'];

	const {control, reset, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			textStyle: '',
			briefingTextStyle: '',
			designation: '',
			designationTextStyle: '',
			briefing: '',
			article: articleId || '',
			personAction: '',
			personActionDetails: '',
			model: 'gpt',
		},
	});

	const onSubmit = async (data) => {

		if (showOptions && !data.personActionDetails) {
			toast.warning('Please provide details about Action');
			return;
		}
		try {
			if (!showOptions) {
				data.personActionDetails = '';
			}
			const starterString = person ? `Name: ${person?.fields?.Name};\nAge: ${person?.fields?.Age};\nGender: ${person?.fields?.Gender};\nPlace of residence: ${person?.fields['Place of residence']};\nJob title: ${person?.fields['Job title']};\n` : "";
			data.personData = selectedValues.reduce((acc, curr) => acc + `${curr}: ${person?.fields[curr]};\n`, starterString)
			setSteps(null);
			setTimeout(() => setSteps(steps += 1), 350);
			setFormData(data);
			await createShorts(data);
		} catch (e) {
			console.log('error: ', e);
		}
	};


	const actions = actionsList.map((p) => <MenuItem
		key={p}
		value={p}
	>{p}</MenuItem>);

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
				header={'Create Short posts for Article'}
				sx={{flexGrow: 1}}
			/>
			<Box
				sx={{
					display: 'flex',
					gap: '1rem'
				}}
			>
				<Box>
					<Typography
						variant='subtitle1'
						gutterBottom
					>Model*: </Typography>
					<Controller

						name='model'
						control={control}
						render={({field}) => (
							<Select
								sx={{width: '20rem'}}
								disabled={loading}
								{...field}
								error={!!errors.model}
							>
								<MenuItem value={'gpt'}>Chat GPT</MenuItem>
								<MenuItem value={'claude'}>Claude</MenuItem>
							</Select>
						)}
					/>
					{errors.model && <Typography color='error'>{errors.model.message}</Typography>}
				</Box>
				{!articleId && <Box sx={{flex: '1 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Select Article*
					</Typography>
					<FormControl
						fullWidth
						variant='outlined'
						sx={{mb: 2}}
					>
						<Controller
							name='article'
							control={control}
							render={({field}) => (
								<Select
									disabled={loading} {...field}
									error={!!errors.article}
								>
									<MenuItem value={``}>
										<em>None</em>
									</MenuItem>
									{articles}
								</Select>
							)}
						/>
						{errors.article && <Typography color='error'>{errors.article.message}</Typography>}
					</FormControl>
				</Box>}
			</Box>
			<Box sx={{width: '100%', marginTop: '1rem'}}>
				<Box
					sx={{
						display: 'flex',
						gap: '1rem',
					}}
				>
					<Box
						sx={{
							width: '20rem'
						}}
					>
						<Typography
							variant='subtitle1'
							gutterBottom
						>
							Select Action for Persona*
						</Typography>
						<FormControl
							fullWidth
							variant='outlined'
							sx={{mb: 2}}
						>
							<Controller
								name='personAction'
								control={control}
								render={({field: {onChange, value, ...rest}}) => (
									<Select
										disabled={loading}
										error={!!errors.personAction}
										// helperText={errors.personAction?.message}
										value={value}
										onChange={(event) => {
											const selectedValue = event.target.value;
											onChange(selectedValue);
											selectedValue === 'Get the Lead magnet' || selectedValue === 'Learn about an offer'
												? setShowOptions(true)
												: setShowOptions(false);
										}}
									>
										<MenuItem value={``}>
											<em>None</em>
										</MenuItem>
										{actions}
									</Select>
								)}
							/>
							{errors.personAction && <Typography color='error'>{errors.personAction.message}</Typography>}
						</FormControl>
					</Box>
					{showOptions && <
						Box
						sx={{flex: '1 1'}}
					>
						<Typography
							variant='subtitle1'
							gutterBottom
						>
							Please share details about Action*
						</Typography>
						<Controller
							name='personActionDetails'
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
					</Box>}
				</Box>
				<Box sx={{flex: '1 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						What text style are you prefer?*
					</Typography>
					<Controller
						name='textStyle'
						control={control}
						render={({field}) => (
							<TextField
								disabled={loading}
								{...field}
								variant='outlined'
								fullWidth
								error={!!errors.textStyle}
								helperText={errors.textStyle?.message}
								sx={{mb: 2}}
								multiline
								rows={3}
							/>
						)}
					/>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: '1rem',
					}}
				>
					<Box sx={{flex: '3 1'}}>
						<Typography
							variant='subtitle1'
							gutterBottom
						>
							The Briefing*
						</Typography>
						<Controller
							name='briefing'
							control={control}
							render={({field}) => (
								<TextField
									disabled={loading}
									{...field}
									variant='outlined'
									fullWidth
									error={!!errors.briefing}
									helperText={errors.briefing?.message}
									sx={{mb: 2}}
									multiline
									rows={3}
								/>
							)}
						/>
					</Box>
					<Box sx={{flex: '4 1'}}>
						<Typography
							variant='subtitle1'
							gutterBottom
						>
							Briefing's text style*
						</Typography>
						<Controller
							name='briefingTextStyle'
							control={control}
							render={({field}) => (
								<TextField
									disabled={loading}
									{...field}
									variant='outlined'
									fullWidth
									error={!!errors.briefingTextStyle}
									helperText={errors.briefingTextStyle?.message}
									sx={{mb: 2}}
									multiline
									rows={3}
								/>
							)}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: '1rem',
					}}
				>
					<Box sx={{flex: '3 1'}}>
						<Typography
							variant='subtitle1'
							gutterBottom
						>
							The Designation*
						</Typography>
						<Controller
							name='designation'
							control={control}
							render={({field}) => (
								<TextField
									disabled={loading}
									{...field}
									variant='outlined'
									fullWidth
									error={!!errors.designation}
									helperText={errors.designation?.message}
									sx={{mb: 2}}
									multiline
									rows={3}
								/>
							)}
						/>
					</Box>
					<Box sx={{flex: '4 1'}}>
						<Typography
							variant='subtitle1'
							gutterBottom
						>
							Designation's text style*
						</Typography>
						<Controller
							name='designationTextStyle'
							control={control}
							render={({field}) => (
								<TextField
									disabled={loading}
									{...field}
									variant='outlined'
									fullWidth
									error={!!errors.designationTextStyle}
									helperText={errors.designationTextStyle?.message}
									sx={{mb: 2}}
									multiline
									rows={3}
								/>
							)}
						/>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					padding: '3rem 0',
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem'
				}}
			>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					disabled={loading}
				>
					Submit
				</Button>
				<Button
					disabled={loading}
					onClick={previousStepHandler}
					variant='outlined'
					color='primary'
					fullWidth
				>
					Return
				</Button>
			</Box>
		</Box>
	);
};

export default ShortsForm;
