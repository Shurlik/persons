import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../ToggleEdit";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {addShorts} from "../../services/shorts";

const ShortsResult = ({result, setResult, loading, formData, setLoading}) => {
	const resultBoxRef = useRef(null);
	const [edit, setEdit] = useState(false);

	const navigate = useNavigate();

	const saveHandler = async () => {
		setLoading(true);
		const tt = [formData.article]
		const data = {content: result, article: tt};
		try {
			await addShorts(data);
			toast.success('Added');
			navigate(`/shorts`, {replace: true});
			setLoading(false);
		} catch (e) {
			console.log('error: ', e);
			setLoading(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (resultBoxRef.current) {
			resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
		}
	}, [result]);

	return (
		<Container sx={{position: 'relative'}}>
			<OutputsTextField
				ref={resultBoxRef}
				editable={edit}
				value={result}
				title={'Final result'}
				loading={loading}
				onChange={(event) => setResult(event.target.value)}
			/>
			<ToggleEdit
				isEdit={edit}
				onClick={() => setEdit(old => !old)}
			/>
			<Box
				sx={{
					marginTop: '3rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem'
				}}
			>
				<Button
					onClick={saveHandler}
					variant='contained'
					color='primary'
					fullWidth
				>
					Submit
				</Button>
				<Button
					onClick={() => setResult('')}
					variant='outlined'
					color='primary'
					fullWidth
				>
					Return
				</Button>
			</Box>
			<ToggleEdit
				isEdit={edit}
				onClick={() => setEdit(old => !old)}
			/>;
		</Container>
	)
		;
};

export default ShortsResult;
