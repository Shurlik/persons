import React, {useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import {updateBlogPostData} from "../services/airtable";
import {toast} from "react-toastify";
import axios from "axios";
import {colors} from "../assets/styles/colors";
import Loader from "./Loader";
import OutputsTextField from "./OutputsTextField";

const ResearchResult = ({research, setResearch, setSteps, airId}) => {
	const [loading, setLoading] = useState(false);

	const researchHandler = async () => {
		setLoading(true);
		const data = {"AI Output (Research)": research};

		try {
			const res = await updateBlogPostData(airId, data);
			const result = await axios(`https://hook.eu2.make.com/xbowo27h47trxsd8w2rfjzbkdg69qn8g?record_id=${airId}`);
			toast.success('Success!');
			setSteps(null);
			setTimeout(() => setSteps(3), 350);
			setLoading(false);
		} catch (e) {
			console.log('error: ', e);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container sx={{width: '100%'}}>
			<OutputsTextField
				title={'Research results'}
				loading={loading}
				onChange={(event) => setResearch(event.target.value)}
				value={research}
			/>
			<Button
				onClick={researchHandler}
				variant={'contained'}
				color={'primary'}
				sx={{width: '100%', marginTop: '3rem'}}
				disabled={loading}
			>Next step</Button>
			{loading && <Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: colors.black20,
					flexDirection: 'column'
				}}
			>
				<Loader/></Box>}
		</Container>
	);
};

export default ResearchResult;
