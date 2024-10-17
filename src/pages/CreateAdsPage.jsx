import React, {useState} from 'react';
import {Container} from "@mui/material";
import AdsForm from "../components/Ads/AdsForm";
import {getBenefitsStream, getResultStream} from "../services/airtable";
import {toast} from "react-toastify";
import AdsBenefits from "../components/Ads/AdsBenefits";
import FullPageLoader from "../components/FullPageLoader";
import AdsResult from "../components/Ads/AdsResult";

const CreateAdsPage = () => {
	const [benefits, setBenefits] = useState('')
	const [result, setResult] = useState('')
	const [loading, setLoading] = useState(null)
	const [formData, setFormData] = useState(null)


	const createBenefits = async (data) => {
		setLoading(true)
		try {
			await getBenefitsStream(data, (chunk) => {
				setBenefits((prev) => prev + chunk);
			});
			// toast.success('Added')
			// navigate(`/${data.ad}`)
			setLoading(false)
		} catch (e) {
			toast.error('Something goes wrong')
			console.log('error: ', e);
			setLoading(false)
		}
		setLoading(false)
		console.log(data);
	}

	const createResult = async (data) => {
		setLoading(true)
		try {
			await getResultStream(data, (chunk) => {
				setResult((prev) => prev + chunk);
			});
			// toast.success('Added')
			// navigate(`/${data.ad}`)
			setLoading(false)
		} catch (e) {
			toast.error('Something goes wrong')
			console.log('error: ', e);
			setLoading(false)
		}
		setLoading(false)
		console.log(data);
	}


	return (
		<Container>
			{!benefits && <AdsForm {...{createBenefits, setFormData}}/>}
			{benefits && !result && <AdsBenefits{...{benefits, setBenefits, loading, createResult, formData}} />}
			{result && <AdsResult{...{result, setResult, loading, formData, setLoading}} />}
			{loading && <FullPageLoader/>}
		</Container>
	);
};

export default CreateAdsPage;
