import React, {useEffect, useRef, useState} from 'react';
import {Button, Container} from "@mui/material";
import {updateBlogPostData} from "../../services/airtable";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

const CosOutputs = ({airId, setSteps, steps, final, setFinal, provider,  loading, setLoading, thumbnailStream}) => {
	const [edit, setEdit] = useState(false);
	const resultBoxRef = useRef(null);


	const nextStepHandler = async () => {
		setLoading(true)
		await updateBlogPostData(airId, {'AI Final Output (Blogpost)': final});
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 350);
		await thumbnailStream()
	};

	const previousStepHandler = () => {
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	useEffect(() => {
		if (resultBoxRef.current) {
			resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
		}
	}, [final]);

	return (
		<Container sx={{position: 'relative'}}>
			<OutputsTextField
				ref={resultBoxRef}
				editable={edit}
				value={final}
				title={'AI final Output'}
				loading={loading}
				onChange={(event) => setFinal(event.target.value)}
			/>
			<Button
				onClick={nextStepHandler}
				variant={'contained'}
				color={'primary'}
				sx={{width: '100%', marginTop: '3rem'}}
				disabled={loading || !final}
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
