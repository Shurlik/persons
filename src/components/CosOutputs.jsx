import React, {useEffect, useState} from 'react';
import {Button, Container} from "@mui/material";
import useSWR from "swr";
import {getContent, updateBlogPostData} from "../services/airtable";
import OutputsTextField from "./OutputsTextField";
import ToggleEdit from "./ToggleEdit";

const CosOutputs = ({airId, setSteps, steps}) => {

	const [final, setFinal] = useState('');
	const [edit, setEdit] = useState(false);
	const {data = {}, error, isLoading, mutate} = useSWR(`/cos/content/${airId}`, () =>
		getContent(airId)
	);

	const nextStepHandler = async () => {
		setLoading(true);
		await updateBlogPostData(airId, {'AI Final Output (Blogpost)': final });
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 350);
		setLoading(false);
	};

	const previousStepHandler = () => {
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	useEffect(() => {
		if (data) {
			setFinal(data?.content?.fields['AI Final Output (Blogpost)']);
		}
	}, [data]);


	const [loading, setLoading] = useState(false);

	return (
		<Container  sx={{position: 'relative'}}>
			<OutputsTextField
				editable={edit}
				value={final}
				title={'AI final Output'}
				loading={loading}
				onChange={(event) => setFinal(event.target.value)}  />
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

export default CosOutputs;
