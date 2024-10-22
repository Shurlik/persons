import React, {useEffect, useRef, useState} from 'react';
import {Button, Container} from "@mui/material";
import {updateBlogPostData} from "../../services/airtable";
import ToggleEdit from "../services/ToggleEdit";
import OutputsTextField from "../OutputsTextField";

const CosOutline = ({airId, setSteps, steps, setOutline, outline, loading, setLoading, articleStream}) => {
	// const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);
	const resultBoxRef = useRef(null);

	const nextStepHandler = async () => {
		setLoading(true);
		await updateBlogPostData(airId, {'AI Outline (Blogpost)': outline});
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 400);
		await articleStream()
	};

	const previousStepHandler = () => {
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	useEffect(() => {
		if (resultBoxRef.current) {
			resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
		}
	}, [outline]);


	return (
		<Container sx={{position: 'relative'}}>
			<OutputsTextField
				ref={resultBoxRef}
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
				disabled={loading || !outline}
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
