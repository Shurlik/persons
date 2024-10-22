import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import personData from "../utils/personData";
import {colors} from "../assets/styles/colors";
import UserCreateSimple from "../components/UserCreateSimple";
import Steps from "../components/steps/Steps";
import {updateRecord} from "../services/airtable";
import {useLocation, useNavigate} from "react-router-dom";
import {fullPersData, personaKeys} from "../utils/fullPersData";
import Loader from "../components/Loader";


const ProfileCreation = () => {
	const [userId, setUserId] = useState(null);
	const [activeStep, setActiveStep] = useState(0);
	const steps = Object.keys(personData);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const [showLoader, setShowLoader] = useState(true);
	const [showStart, setShowStart] = useState(false);
	const navigate = useNavigate();


	useEffect(() => {
		const id = location?.state?.userId;
		if (id) {
			setUserId(id);
		}
		setShowLoader(false);
	}, []);

	const handleNext = async (callback) => {
		setActiveStep(activeStep + 1);

		await generateHandler(null, activeStep + 1);
		await callback();
		setLoading(false);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	async function generateHandler(callback, step) {
		const st = step ? step : activeStep;

		setLoading(true);
		try {
			const currentSection = steps[st];
			await updateRecord(userId, personData[currentSection].keys, personData[currentSection].prompt);
			if (callback) {
				await callback();
			}
		} catch (e) {
			console.log('error: ', e);
		}

	}

	async function fullPersonStart() {
		setLoading(true);
		try {
			await updateRecord(userId, personaKeys, fullPersData);
			navigate('/persons', {replace: true});
			setLoading(false);
		} catch (e) {
			console.log('error: ', e);
			setLoading(false);
		}
	}

	async function stepsPersonStart() {
		await generateHandler();
		setShowStart(false);
		setLoading(false);
	}

	if (showStart) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: '5rem',
					height: '75%'
				}}
			>
				<Box>
					<Button
						disabled={loading}
						variant='outlined'
						onClick={fullPersonStart}
						sx={{
							borderRadius: '.5rem',
							color: colors.mainGreen,
							border: `1px solid ${colors.mainGreen}`,
							minWidth: '20rem',
							minHeight: '5rem',
							fontWeight: 'bold',
							fontSize: '2rem',
							'&:hover': {
								color: colors.black,
								boxShadow: `0 0 2px 3px ${colors.mainGreen50}`,
								backgroundColor: colors.mainGreen
							}
						}}
					>
						{"Create full person"}
					</Button>
				</Box>
				<Box>
					<Button
						disabled={loading}
						variant='outlined'
						onClick={stepsPersonStart}
						sx={{
							borderRadius: '.5rem',
							color: colors.mainGreen,
							border: `1px solid ${colors.mainGreen}`,
							minWidth: '20rem',
							minHeight: '5rem',
							fontSize: '2rem',
							fontWeight: 'bold',
							'&:hover': {
								color: colors.black,
								boxShadow: `0 0 2px 3px ${colors.mainGreen50}`,
								backgroundColor: colors.mainGreen
							}
						}}
					>
						{'Create by steps'}
					</Button>
				</Box>
				{loading && <Box sx={{position: 'absolute', textAlign: 'center', top: '50%'}}>
					<Loader/>
				</Box>}
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '3rem 5rem',
				backgroundColor: colors.darkGrey,
				height: '90%'
			}}
		>
			{!userId ? <UserCreateSimple onFinish={setUserId} {...{setShowStart}}/> :
				<Steps  {...{
					steps,
					handleBack,
					generateHandler,
					handleNext,
					activeStep,
					userId,
					loading,
					setLoading,
					setActiveStep
				}} />}
		</Box>
	);
};

export default ProfileCreation;
