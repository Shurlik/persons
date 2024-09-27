import React, {useEffect, useState} from 'react';
import {Box, Button, Step, StepConnector, StepLabel, Stepper, Typography,} from '@mui/material';
import {colors} from "../assets/styles/colors";
import CustomStepIcon from "./steps/CustomStepIcon";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import personData from "../utils/personData";
import Loader from "./Loader";
import useSWR from "swr";
import {getRecordById, updateRecord} from "../services/airtable";
import Fields from "./Fields";
import {useNavigate} from "react-router-dom";


const CustomConnector = (
	<StepConnector
		sx={{
			transition: '.3s',
			top: 25,
			left: '-25%',
			width: '50%',
			alignSelf: 'center',
			'& .MuiStepConnector-line': {
				borderStyle: 'dotted',
				border: 'none',
				borderBottom: `1px dotted ${colors.mainGreen}`,
				// borderBottomColor: colors.mainGreen,
				opacity: .5,
			},
			'&.Mui-active .MuiStepConnector-line': {
				opacity: 1,
			},
			'&.Mui-completed .MuiStepConnector-line': {
				opacity: 1,
			},
		}}
	/>
);


const FormLayout = ({
	                    generateHandler,
	                    steps,
	                    handleBack,
	                    handleNext,
	                    activeStep,
	                    userId,
	                    loading,
	                    setLoading,
	                    setActiveStep
                    }) => {
	const {data = {}, error, isLoading, mutate} = useSWR(`/persons/${userId}`, () => getRecordById(userId));
	const navigate = useNavigate();
	const [editedFields, setEditedFields] = useState({});

	const handleFieldChange = (field, value) => {
		setEditedFields(prev => ({...prev, [field]: value}));
	};

	useEffect(() => {
		if (data?.fields) {
			setEditedFields(data.fields);

		}

	}, [data?.fields]);

	const nextStepHandler = async () => {
		setLoading(true);
		try {
			await updateRecord(userId, editedFields);
			if (activeStep >= steps.length - 1) {
				await mutate();
				navigate('/persons', {replace: true});
			}
			await handleNext(mutate);
		} catch (e) {
			console.log('error: ', e);
		} finally {
			setLoading(false);
		}
	};

	const renderStepContent = (step) => {
		const currentSection = steps[step];
		const sectionData = personData[currentSection];
		if (!sectionData) return null;

		if (loading) {
			return <Loader/>;
		}

		return (
			<Box>
				<Typography
					variant='h3'
					mb={3}
				>{currentSection}</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(1, 1fr)',
						justifyContent: 'center',
						gap: '2rem',
					}}
				>
					{sectionData.keys.map((field) => (
						<Box key={field}>
							<Typography
								sx={{fontWeight: 'bold', color: colors.white, fontSize: '1.3rem', marginBottom: '.5rem'}}
							>{field}: </Typography>
							<Fields
								handleFieldChange={handleFieldChange}
								field={field}
								loading={loading}
								value={editedFields[field]|| ''}
							/>
						</Box>
					))}
				</Box>
			</Box>
		);
	};

	return (
		<Box
			sx={{
				maxWidth: '100rem',
				color: 'white',
				backgroundColor: colors.backgroundMain,
				padding: '2rem',
				margin: '0 auto'
			}}
		>
			{/* Stepper */}
			<Stepper
				activeStep={activeStep}
				alternativeLabel
				sx={{marginBottom: '2rem'}}
				connector={CustomConnector}
			>
				{steps.map((label, index) => (
					<Step
						key={label}
						onClick={() => setActiveStep(index)}
						sx={{cursor: 'pointer'}}
					>
						<StepLabel
							sx={{
								flexShrink: 1,
								textWrap: 'wrap',
								color: colors.mainGreen,
								opacity: activeStep === index ? 1 : .5,
								'& .MuiStepLabel-label': {
									color: colors.mainGreen,
									'&.Mui-active': {
										color: colors.mainGreen,
									}
								},
								'& .MuiStepLabel-active': {
									color: colors.mainGreen,
								},
								'& .MuiStepIcon-root': {
									color: colors.mainGreen,
								},
							}}
							StepIconComponent={CustomStepIcon}
						>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>

			{/* Step Content */}
			<Box
				sx={{
					padding: '3rem',
					backgroundColor: colors.background,
					borderRadius: '1.5rem',
					maxWidth: '1080px',
					margin: '0 auto'
				}}
			>
				{renderStepContent(activeStep)}
			</Box>

			{/* Navigation Buttons */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '1rem',
					marginTop: '2rem',
				}}
			>
				<Button
					sx={{
						width: '100%',
						paddingY: '.7rem',
						fontWeight: 'bold',
						maxWidth: '7rem',
						border: `1px solid ${colors.backgroundMain}`
					}}
					component='label'
					role={undefined}
					variant='outlined'
					color={'secondary'}
					startIcon={<ArrowBackIcon/>}
					onClick={handleBack}
					disabled={activeStep <= 0 || loading}
				>
					Previous
				</Button>
				<Button
					sx={{
						width: '100%',
						paddingY: '.7rem',
						fontWeight: 'bold',
						maxWidth: '7rem',
						border: `1px solid ${colors.backgroundMain}`,
						'&:disabled': {
							border: 'none',
							backgroundColor: 'none'
						}
					}}
					component='label'
					role={undefined}
					variant='outlined'
					color={'secondary'}
					endIcon={activeStep < steps.length - 1 && <ArrowForwardIcon/>}
					onClick={nextStepHandler}
					disabled={loading}
				>
					{activeStep < steps.length - 1 ? 'Next' : 'Finish'}
				</Button>
			</Box>
		</Box>
	);
};

export default FormLayout;
