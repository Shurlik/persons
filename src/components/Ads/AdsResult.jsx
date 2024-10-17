import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../ToggleEdit";
import {addAds} from "../../services/airtable";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const AdsResult = ({result, setResult, loading, formData, setLoading}) => {
	const resultBoxRef = useRef(null);
	const [edit, setEdit] = useState(false);

	const navigate = useNavigate();

	const saveHandler = async () => {
		setLoading(true)
		const data = {content: result, ad: formData.ad, personId: formData.personId};
		try {
			await addAds(data);
			toast.success('Added');
			navigate(`/ads/${formData.ad}`, {replace: true});
			setLoading(false)
		} catch (e) {
			console.log('error: ', e);
			setLoading(false)
		}
		setLoading(false)
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

export default AdsResult;
