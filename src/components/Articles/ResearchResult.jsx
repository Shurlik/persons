import React, {useEffect, useRef, useState} from 'react';
import {Button, Container} from "@mui/material";
import {updateBlogPostData} from "../../services/airtable";
import {toast} from "react-toastify";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

const ResearchResult = ({research, setResearch, setSteps, airId, steps, loading, setLoading, outlineStream}) => {
	const [edit, setEdit] = useState(false);
	const resultBoxRef = useRef(null);

		const researchHandler = async () => {
			setLoading(true);
			const data = {"AI Output (Research)": research};

			try {
				await updateBlogPostData(airId, data);
				toast.success('Success!');
				setSteps(null);
				setTimeout(() => setSteps(steps + 1), 350);
				await outlineStream()
				setLoading(false);
			} catch (e) {
				console.log('error: ', e);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		const previousStepHandler = () => {
			setSteps(null);
			setTimeout(() => setSteps(steps - 1), 400);
		};

		useEffect(() => {
			if (resultBoxRef.current) {
				resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
			}
		}, [research]);

		return (
			<Container sx={{width: '100%', position: 'relative', transition: '1s'}}>
				<OutputsTextField
					ref={resultBoxRef}
					editable={edit}
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
					disabled={loading || !research}
				>Next step</Button>
				<Button
					onClick={previousStepHandler}
					variant={'outlined'}
					color={'primary'}
					sx={{width: '100%', marginTop: '1rem'}}
					disabled={loading}
				>Previous step</Button>

				<ToggleEdit
					loading={loading}
					isEdit={edit}
					onClick={() => setEdit(old => !old)}
				/>
			</Container>
		);
	};

	export default ResearchResult;
