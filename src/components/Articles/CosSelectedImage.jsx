import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {getContent, updateBlogPostData} from "../../services/airtable";
import {Box, Button, Container} from "@mui/material";
import {colors} from "../../assets/styles/colors";
import Loader from "../Loader";
import OutputsTextField from "../OutputsTextField";
import PageHeader from "../PageHeader";
import axios from "axios";
import ToggleEdit from "../services/ToggleEdit";
import FullPageLoader from "../FullPageLoader";

const CosSelectedImage = ({airId, selectedImageId, setSteps, steps, prompt, setPrompt}) => {
	// const {data = {}, error, isLoading, mutate} = useSWR(`/cos/content/${airId}`, () =>
	// 	getContent(airId)
	// );
	const [edit, setEdit] = useState(false);

	// const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);

	const nextStepHandler = async () => {
		setLoading(true);
		await updateBlogPostData(airId, {'Thumbnail Prompt': prompt});
		await axios(`https://hook.eu2.make.com/sohfl6556adrsi6eu721e4s68w8cgole?recordId=${airId}`);

		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 350);
		setLoading(false);
	};

	const previousStepHandler = () => {
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	useEffect(() => {
		if (prompt && selectedImageId?.description) {
			setPrompt(prompt + '\n\n' + selectedImageId?.description);
		}
	}, []);

	useEffect(() => {
		if (!selectedImageId?.id) {
			setSteps(null);
			setTimeout(() => setSteps(steps += 1), 350);
		}
	}, []);

	if(!selectedImageId?.id){
		return <Loader />
	}

	return (
		<Container sx={{position: 'relative'}}>
			<PageHeader
				header={'Selected Image Style'}
				sx={{flexGrow: 1}}
			/>
			{!!selectedImageId?.id && <Box
				sx={{
					width: '20rem',
					marginBottom: '2rem',
					marginTop: '1rem'
				}}
			>
				<Box
					component={'img'}
					alt={'img'}
					src={selectedImageId?.url}
					sx={{width: '100%', height: '100%', objectFit: 'cover',}}
				/>

			</Box>}
			<OutputsTextField
				editable={edit}
				title={'Final Image Prompt'}
				loading={loading}
				onChange={(event) => setPrompt(event.target.value)}
				value={prompt}
			/>

			<Button
				onClick={nextStepHandler}
				variant={'contained'}
				color={'primary'}
				sx={{width: '100%', marginTop: '3rem'}}
				disabled={loading}
			>Next step</Button>
			<Button
				onClick={previousStepHandler}
				variant={'outlined'}
				color={'primary'}
				sx={{width: '100%', marginTop: '1rem'}}
				disabled={loading}
			>Previous step</Button>
			<ToggleEdit
				isEdit={edit}
				onClick={() => setEdit(old => !old)}
			/>
			{loading && <FullPageLoader />}
		</Container>
	);
};

export default CosSelectedImage;
