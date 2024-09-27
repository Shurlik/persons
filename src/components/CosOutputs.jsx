import React, {useEffect, useState} from 'react';
import {Button, Container} from "@mui/material";
import useSWR from "swr";
import {getContent} from "../services/airtable";
import OutputsTextField from "./OutputsTextField";

const CosOutputs = ({airId, setSteps}) => {

	const {data = {}, error, isLoading, mutate} = useSWR(`/cos/content/${airId}`, () =>
		getContent(airId)
	);

	const nextStepHandler = () => {
		setLoading(true);
		setSteps(null);
		setTimeout(() => setSteps(4), 350);
		setLoading(false);
	};

	useEffect(() => {
		if (data) {
			setFinal(data?.content?.fields['AI Final Output (Blogpost)']);
			setMeta(data?.content?.fields['AI Meta Description']);
			setFacts(data?.content?.fields['Facts Lookup Prompt']);
			setResults(data?.content?.fields['Perplexity Research']);
		}
	}, [data]);

	const [final, setFinal] = useState('');
	const [meta, setMeta] = useState('');
	const [facts, setFacts] = useState('');
	const [results, setResults] = useState('');

	const [loading, setLoading] = useState(false);

	return (
		<Container>
			<OutputsTextField
				value={final}
				title={'AI final Output'}
				loading={loading}
				onChange={(event) => setFinal(event.target.value)}  />
			{/*<Box>*/}
			{/*	<Typography*/}
			{/*		variant={'h4'}*/}
			{/*		sx={{color: colors.white}}*/}
			{/*	>Meta Description</Typography>*/}
			{/*	<TextField*/}
			{/*		sx={{...loginInputStyles, width: '100%'}}*/}
			{/*		variant='standard'*/}
			{/*		multiline*/}
			{/*		rows={15}*/}
			{/*		required*/}
			{/*		disabled={loading}*/}
			{/*		// disabled*/}
			{/*		value={meta}*/}
			{/*		onChange={(event) => setMeta(event.target.value)}*/}
			{/*	/>*/}
			{/*</Box>*/}
			{/*<Box>*/}
			{/*	<Typography*/}
			{/*		variant={'h4'}*/}
			{/*		sx={{color: colors.white}}*/}
			{/*	>Facts look up</Typography>*/}
			{/*	<TextField*/}
			{/*		sx={{...loginInputStyles, width: '100%'}}*/}
			{/*		variant='standard'*/}
			{/*		multiline*/}
			{/*		rows={20}*/}
			{/*		required*/}
			{/*		// disabled*/}
			{/*		disabled={loading}*/}
			{/*		value={facts}*/}
			{/*		onChange={(event) => setFacts(event.target.value)}*/}
			{/*	/>*/}
			{/*</Box>*/}
			{/*<Box>*/}
			{/*	<Typography*/}
			{/*		variant={'h4'}*/}
			{/*		sx={{color: colors.white}}*/}
			{/*	>Results of Research</Typography>*/}
			{/*	<TextField*/}
			{/*		sx={{...loginInputStyles, width: '100%'}}*/}
			{/*		variant='standard'*/}
			{/*		multiline*/}
			{/*		rows={25}*/}
			{/*		required*/}
			{/*		// disabled*/}
			{/*		disabled={loading}*/}
			{/*		value={results}*/}
			{/*		onChange={(event) => setResults(event.target.value)}*/}
			{/*	/>*/}
			{/*</Box>*/}
			<Button
				onClick={nextStepHandler}
				variant={'contained'}
				color={'primary'}
				sx={{width: '100%', marginTop: '3rem'}}
				disabled={loading}
			>Next step</Button>
		</Container>
	);
};

export default CosOutputs;
