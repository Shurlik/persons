import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../ToggleEdit";

const AdsBenefits = ({benefits, setBenefits, loading, createResult, formData}) => {
	const resultBoxRef = useRef(null);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		if (resultBoxRef.current) {
			resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
		}
	}, [benefits]);

	const getResultHandler = async () => {
		const data = {benefits, personId: formData.personId, ad: formData.ad, model: formData.model};
		await createResult(data);
	};

	return (
		<Container sx={{position: 'relative'}}>
			<OutputsTextField
				ref={resultBoxRef}
				editable={edit}
				value={benefits}
				title={'Benefits'}
				loading={loading}
				onChange={(event) => setBenefits(event.target.value)}
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
					disabled={loading}
					onClick={getResultHandler}
					variant='contained'
					color='primary'
					fullWidth
				>
					Create final result
				</Button>
				<Button
					disabled={loading}
					onClick={() => setBenefits('')}
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
			/>
		</Container>
	);
};

export default AdsBenefits;
