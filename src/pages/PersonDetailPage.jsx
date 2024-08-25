import React, {useState} from 'react';
import useSWR from "swr";
import {getRecordById} from "../services/airtable";
import {Box, Button, Container, Typography} from "@mui/material";
import BasicTabs from "../components/Tabs";
import {createDetails} from "../services/chatGpt";
import Loader from "../components/Loader";
import {useLocation} from "react-router-dom";

const PersonDetail = () => {
	const location = useLocation();
	const id = location.pathname.split('/')[2];
	const {data = {}, error, isLoading, mutate} = useSWR(`/persons/${id}`, () => getRecordById(id));

	const values = data?.fields ? {text: data?.fields['Values'], title: 'Values'} : {};
	const painpoints = data?.fields ? {text: data?.fields['Painpoints'], title: 'Painpoints'} : {};
	const fears = data?.fields ? {text: data?.fields['5 biggest fears'], title: '5 biggest fears'} : {};
	const goals = data?.fields ? {text: data?.fields['Goals'], title: 'Goals'} : {};
	const genie = data?.fields ? {text: data?.fields['Magic Genie'], title: 'Magic Genie'} : {};
	const [loading, setLoading] = useState(false);

	const details = [values, painpoints, fears, goals, genie].filter(e => !!e?.text);

	async function generateDetails() {
		setLoading(true);
		try {
			const res = await createDetails(id);
			console.log(res);
			await mutate();
		} catch (e) {
			console.log('error: ', e);
		}
		setLoading(false);
	}

	if (isLoading) {
		return <Box
			sx={{
				display: 'flex',
				flex: '1 1',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<Loader/>
		</Box>;
	}

	return (
		<Box
			sx={{
				width: '100%',
				margin: '0 12px',
				border: '15px solid #231E39',
			}}
		>
			<Box sx={{textAlign: 'center', pt: 2, pb: 2, backgroundColor:'#231E39', color: '#B3B8CD'}}>
				<Typography variant={'h4'}>
					{data?.fields.Name}
				</Typography>
			</Box>
			<Box
				sx={{
					backgroundColor: '#fff',
				}}
			>
				{
					!!details.length
						? <BasicTabs data={details}/>
						: <Box
							sx={{
								display: 'flex',
								flex: '1 1',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '10rem'
							}}
						>
							{loading ? <Loader/> : <Button
								color='success'
								variant={'contained'}
								onClick={generateDetails}
							>Generate</Button>}
						</Box>
				}
			</Box>
		</Box>
	);
};

export default PersonDetail;
