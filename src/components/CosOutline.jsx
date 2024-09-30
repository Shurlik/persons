import React, {useEffect, useState} from 'react';
import {Button, Container} from "@mui/material";
import useSWR from "swr";
import {getContent, updateBlogPostData} from "../services/airtable";
import ToggleEdit from "./ToggleEdit";
import OutputsTextField from "./OutputsTextField";

const CosOutline = ({airId, setSteps, steps}) => {
	const [edit, setEdit] = useState(false);
	const [outline, setOutline] = useState('');

	const {data = {}, error, isLoading, mutate} = useSWR(`/cos/content/${airId}`, () =>
		getContent(airId)
	);

	const nextStepHandler = async () => {
		setLoading(true);
		await updateBlogPostData(airId, {'AI Outline (Blogpost)': outline });
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 400);
		setLoading(false);
	};

	const previousStepHandler = () => {
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	useEffect(() => {
		if (data) {
			setOutline(data?.content?.fields['AI Outline (Blogpost)']);
		}
	}, [data]);


	const [loading, setLoading] = useState(false);

	return (
		<Container sx={{position: 'relative'}}>
			<OutputsTextField
				editable={edit}
				value={outline}
				title={'Outline'}
				loading={loading}
				onChange={(event) => setOutline(event.target.value)}
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
		</Container>
	);
};

export default CosOutline;
