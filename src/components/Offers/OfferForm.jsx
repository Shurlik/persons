import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Typography} from "@mui/material";
import PageHeader from "../PageHeader";
import {colors} from "../../assets/styles/colors";
import CustomSelect from "../CustomSelect";
import CustomTextField from "../CustomTextField";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
	offer: yup.string().required('Please, set title of the Offer'),
	steps: yup.number().min(2,'Need as minimum 2 Modules'),
});

const OfferForm = ({setFormData, loading, setSteps, steps, formData, createSteps}) => {

	const {control, reset, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema),
		defaultValues: formData ? formData : {
			model: 'gpt',
			offer: '',
			steps: 2,
			additionalInformation: ''
		},
	});

	const options = [
		{value: 'gpt', label: 'Chat GPT'},
		{value: 'claude', label: 'Claude'},
	];

	const onSubmit = async (data) => {
		setFormData(data);
		setSteps(null);
		setTimeout(() => setSteps(steps + 1), 350);
		await createSteps(data);
	};

	const previousStepHandler = () => {
		reset();
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};


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
					header={'Create Offer'}
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
							/>
						)}
					/>
				</Box>
			</Box>
			<Box sx={{
				display: 'flex',
				gap: '1rem',
				marginTop: '1rem'
			}}>
				<Box sx={{flex: '3 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Name of the Offer
					</Typography>
					<Controller
						name='offer'
						control={control}
						render={({field}) => (
							<CustomTextField
								{...{field}}
								disabled={loading}
							/>
						)}
					/>
					{errors.offer && <Typography color='error'>{errors.offer.message}</Typography>}
				</Box>
				<Box sx={{flex: '1 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Number of Modules
					</Typography>
					<Controller
						name='steps'
						control={control}
						render={({field}) => (
							<CustomTextField
								{...{field}}
								disabled={loading}
								inputProps={{type: 'number'}}
							/>
						)}
					/>
					{errors.steps && <Typography color='error'>{errors.steps.message}</Typography>}
				</Box>
			</Box>
			<Box sx={{marginTop: '1rem'}}>
				<Typography
					variant='subtitle1'
					gutterBottom
				>
					Additional Information
				</Typography>
				<Controller
					name='additionalInformation'
					control={control}
					render={({field}) => (
						<CustomTextField
							{...{field}}
							disabled={loading}
							multiline
							rows={4}
						/>
					)}
				/>
			</Box>
			<Box
				sx={{
					padding: '5rem 0 0',
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
					{`Generate`}
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

export default OfferForm;
