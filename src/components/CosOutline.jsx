import React, {useEffect, useRef, useState} from 'react';
import {Button, Container} from "@mui/material";
import {updateBlogPostData} from "../services/airtable";
import ToggleEdit from "./ToggleEdit";
import OutputsTextField from "./OutputsTextField";
import {getOutlineStream} from "../services/cos";
import authService from "../services/auth";
import FullPageLoader from "./FullPageLoader";

const CosOutline = ({airId, setSteps, steps, setOutline, outline, setFinal}) => {
	const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);
	const resultBoxRef = useRef(null);

	const resultStream = async () => {
		setLoading(true);
		setOutline('');
		try {
			await getOutlineStream(airId, (chunk) => {
				setOutline((prev) => prev + chunk);
			});

			setLoading(false);

		} catch (e) {
			console.error('Error fetching streams:', e);
			if (e.message === 'Unauthorized') {
				// Перенаправляем на страницу входа или показываем сообщение
				await authService.logout();
				// Например, используйте React Router для перенаправления
				// history.push('/login');
			} else {
				console.log('getOutlineStream: ', e);
				// Обработка других ошибок
			}
			setLoading(false);
		}
	};

	const nextStepHandler = async () => {
		setLoading(true);
		await updateBlogPostData(airId, {'AI Outline (Blogpost)': outline});

		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 400);
		setLoading(false);
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
			<Button
				variant={'outlined'}
				color={'secondary'}
				onClick={async () => {
					await resultStream();
				}}
			>Generate</Button>
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
			{loading && <FullPageLoader/>}
		</Container>
	);
};

export default CosOutline;
