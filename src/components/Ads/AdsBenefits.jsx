import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";

const AdsBenefits = ({benefits, setBenefits, loading, createResult, formData, setSteps, steps, person, selectedValues}) => {
	const resultBoxRef = useRef(null);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		if (resultBoxRef.current) {
			resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
		}
	}, [benefits]);

	const getResultHandler = async () => {
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 350);
		const starterString = person ? `Name: ${person?.fields?.Name};Age: ${person?.fields?.Age};\nGender: ${person?.fields?.Gender};\nPlace of residence: ${person?.fields['Place of residence']};\nJob title: ${person?.fields['Job title']};\n` : "";
		const personData = selectedValues.reduce((acc, curr) => acc + `${curr}: ${person?.fields[curr]};\n`, starterString);

		const data = {benefits, personId: person.id, ad: formData.ad, model: formData.model, personData };
		await createResult(data);
	};

	const previousStepHandler = () => {
		setBenefits('')
		setSteps(null);
		setTimeout(() => setSteps(steps - 1), 400);
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
					onClick={previousStepHandler}
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
