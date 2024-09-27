import React, {useState} from 'react';
import personData from "../utils/personData";
import {useLocation, useNavigate} from "react-router-dom";
import CreationStarter from "../components/CreationStarter";
import FormLayout from "../components/FormLayout";
import {updateRecord} from "../services/airtable";
import {fullPersData, personaKeys} from "../utils/fullPersData";

const CreatePage = () => {
	const [userId, setUserId] = useState(null);
	// const [userId, setUserId] = useState('recRH7zBgLF7vA1dG');
	const [activeStep, setActiveStep] = useState(0);
	const steps = Object.keys(personData);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const [showLoader, setShowLoader] = useState(true);
	const navigate = useNavigate();


	const handleNext = async (callback) => {
		setActiveStep(activeStep + 1);

		// await generateHandler(null, activeStep + 1);
		await callback();
		setLoading(false);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

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

	return !userId
		? <CreationStarter onFinish={setUserId}/>
		: <FormLayout {
			              ...{
				              steps,
				              handleBack,
				              handleNext,
				              activeStep,
				              userId,
				              loading,
				              setLoading,
				              setActiveStep,
				              generateHandler
			              }
		              } />;
};

export default CreatePage;
