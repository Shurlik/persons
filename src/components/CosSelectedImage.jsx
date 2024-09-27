import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {getContent} from "../services/airtable";
import {Box, Button, Container} from "@mui/material";
import {colors} from "../assets/styles/colors";
import Loader from "./Loader";
import OutputsTextField from "./OutputsTextField";
import PageHeader from "./PageHeader";

const CosSelectedImage = ({airId, selectedImageId, setSteps}) => {
	const {data = {}, error, isLoading, mutate} = useSWR(`/cos/content/${airId}`, () =>
		getContent(airId)
	);


	const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);

	const nextStepHandler = () => {
		setLoading(true);
		setSteps(null);
		setTimeout(() => setSteps(6), 350);
		setLoading(false);
	};

	useEffect(() => {
		if (data) {
			setPrompt(data?.content?.fields['Thumbnail Prompt']);
		}
	}, [data]);


	return (
		<Container>
			<PageHeader
				header={'Selected Image'}
				sx={{flexGrow: 1}}
			/>
			<Box
				sx={{
					width: '20rem',
					marginBottom: '2rem',
					marginTop: '1rem'
				}}
			>
				<Box
					component={'img'}
					alt={'img'}
					src={selectedImageId.url}
					sx={{width: '100%', height: '100%', objectFit: 'cover',}}
				/>

			</Box>
			<OutputsTextField
				title={'Final Prompt'}
				loading={loading}
				onChange={(event) => setPrompt(event.target.value)}
				value={prompt + '\n\n' + '## Additional Prompt to create the Image: ' + selectedImageId.description}
			/>
			{/*<Typography*/}
			{/*	variant={'h4'}*/}
			{/*	sx={{color: colors.white, marginTop: '2rem'}}*/}
			{/*>Final Prompt</Typography>*/}
			{/*<TextField*/}
			{/*	sx={{...loginInputStyles, width: '100%'}}*/}
			{/*	variant='standard'*/}
			{/*	multiline*/}
			{/*	rows={25}*/}
			{/*	required*/}
			{/*	// disabled*/}
			{/*	disabled={loading}*/}
			{/*	value={prompt + '\n\n' + '## Additional Prompt to create the Image: ' + selectedImageId.description}*/}
			{/*	// onChange={(event) => setPrompt(event.target.value)}*/}
			{/*/>*/}

			<Button
				onClick={nextStepHandler}
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

export default CosSelectedImage;
