import React, {useState} from 'react';
import ShortsForm from "../components/Shorts/ShortsForm";
import {Container} from "@mui/material";
import ShortsResult from "../components/Shorts/ShortsResult";
import {getBenefitsStream} from "../services/ads";
import {toast} from "react-toastify";
import {getShortsStream} from "../services/shorts";
import FullPageLoader from "../components/FullPageLoader";

const CreateShortsPage = () => {
	const [result, setResult] = useState('')
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState('')

	const createShorts = async (data) => {
		setLoading(true)
		try {
			await getShortsStream(data, (chunk) => {
				setResult((prev) => prev + chunk);
			});
			setLoading(false)
		} catch (e) {
			toast.error('Something goes wrong')
			console.log('error: ', e);
			setLoading(false)
		}
		setLoading(false)
	}

	return (
		<Container>
			{!result && <ShortsForm {...{loading, setLoading, setFormData, createShorts}}/>}
			{!!result && <ShortsResult {...{result, setResult, loading, setLoading, formData}} />}
			{loading && <FullPageLoader/>}
		</Container>
	);
};

export default CreateShortsPage;
