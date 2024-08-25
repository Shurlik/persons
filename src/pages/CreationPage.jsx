import React, {useState} from 'react';
import {
	Box,
	Button,
	CircularProgress,
	MenuItem,
	Select,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography
} from '@mui/material';
import {generateFullPersonAuto, generatePersonSection} from '../services/chatGpt';
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader";

const PersonaCreation = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [country, setCountry] = useState('');
	const [gender, setGender] = useState('');
	const [creationMode, setCreationMode] = useState('');
	const [personaData, setPersonaData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const steps = ['Select Gender & Country', 'Choose Creation Mode', 'Create Persona'];

	const sections = [
		'Demographic Data',
		'Professional Information',
		'Psychographic Characteristics',
		'Media Usage',
		'Buying Behavior',
		'Needs and challenges',
		'Goals and Dreams',
		'Communication Preferences'
	];

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleCountryChange = (event) => {
		setCountry(event.target.value);
	};
	const handleGenderChange = (event) => {
		setGender(event.target.value);
	};

	const handleCreationModeChange = (event) => {
		setCreationMode(event.target.value);
	};

	const handleFullGeneration = async () => {
		setIsLoading(true);
		try {
			const fullPersona = await generateFullPersonAuto(country, gender);
			navigate('/persons');
		} catch (error) {
			console.error('Error generating full persona:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSectionGeneration = async (section) => {
		setIsLoading(true);
		try {
			const sectionData = await generatePersonSection(country, section);
			setPersonaData(prevData => ({...prevData, [section]: sectionData}));
		} catch (error) {
			console.error(`Error generating section ${section}:`, error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleManualInput = (section, field, value) => {
		setPersonaData(prevData => ({
			...prevData,
			[section]: {
				...prevData[section],
				[field]: value
			}
		}));
	};

	const renderStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<Box>
						<Typography>Select the target country for your persona:</Typography>
						<Select
							value={country}
							onChange={handleCountryChange}
							fullWidth
							sx={{borderRadius: '10px'}}
						>
							<MenuItem value='USA'>United States</MenuItem>
							<MenuItem value='UK'>United Kingdom</MenuItem>
							<MenuItem value='DE'>Germany</MenuItem>
							{/* Add more countries as needed */}
						</Select>
						<Typography sx={{marginTop: '1rem'}}>Select the Gender of your persona:</Typography>
						<Select
							value={gender}
							onChange={handleGenderChange}
							fullWidth
							sx={{borderRadius: '10px'}}
						>
							<MenuItem value='Male'>Male</MenuItem>
							<MenuItem value='Female'>Female</MenuItem>
						</Select>
					</Box>
				);
			case 1:
				return (
					<Box>
						<Typography>Choose how you want to create your persona:</Typography>
						<Select
							value={creationMode}
							onChange={handleCreationModeChange}
							fullWidth
							sx={{borderRadius: '10px'}}
						>
							<MenuItem value='auto'>Generate Automatically</MenuItem>
							{/*<MenuItem value="section">Generate by Sections</MenuItem>*/}
							{/*<MenuItem value="manual">Manual Input</MenuItem>*/}
						</Select>
					</Box>
				);
			case 2:
				if (creationMode === 'auto') {
					return (
						<Box>
							{(!gender || !country || !creationMode) ?
								<Typography variant='h6'>Please, select all values</Typography> : <Button
									onClick={handleFullGeneration}
									disabled={isLoading}
								>
									Generate Full Persona
								</Button>}
							{isLoading && <Box sx={{margin: '0 auto'}}><Loader/></Box>}
						</Box>
					);
				} else if (creationMode === 'section' || creationMode === 'manual') {
					return (
						<Box>
							{sections.map((section) => (
								<Box
									key={section}
									mb={2}
								>
									<Typography variant='h6'>{section}</Typography>
									{creationMode === 'section' && (
										<Button
											onClick={() => handleSectionGeneration(section)}
											disabled={isLoading}
										>
											Generate this section
										</Button>
									)}
									{creationMode === 'manual' && (
										// Here you would map through the fields for each section
										<TextField
											fullWidth
											label='Sample Field'
											onChange={(e) => handleManualInput(section, 'sampleField', e.target.value)}
										/>
									)}
									{isLoading && <CircularProgress/>}
								</Box>
							))}
						</Box>
					);
				}
				return null;
			case 3:
				return (
					<Box>
						<Typography variant='h6'>Review your persona:</Typography>
						<pre>{JSON.stringify(personaData, null, 2)}</pre>
					</Box>
				);
			default:
				return 'Unknown step';
		}
	};

	return (
		<Box
			sx={{
				margin: '0 auto',
				padding: '20px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Stepper
				activeStep={activeStep}
				sx={{
					width: '150%'
				}}
			>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Box sx={{mt: 5, mb: 1, height: '15rem'}}>
				{renderStepContent(activeStep)}
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', pt: 2, mt: 5}}>
				<Button
					color='inherit'
					disabled={activeStep === 0}
					onClick={handleBack}
					sx={{mr: 1}}
				>
					Back
				</Button>
				<Box sx={{flex: '1 1 auto'}}/>
				{activeStep !== steps.length - 1 && <Button
					onClick={handleNext}
					disabled={isLoading}
				>
					{'Next'}
				</Button>}
			</Box>
		</Box>
	);
};

export default PersonaCreation;
