import React, {useEffect, useRef, useState} from 'react';
import {Button, Container} from "@mui/material";
import {updateBlogPostData} from "../services/airtable";
import OutputsTextField from "./OutputsTextField";
import ToggleEdit from "./ToggleEdit";
import {getArticleStream} from "../services/cos";
import authService from "../services/auth";
import FullPageLoader from "./FullPageLoader";

const CosOutputs = ({airId, setSteps, steps, final, setFinal, provider}) => {
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const resultBoxRef = useRef(null);

	const resultStream = async () => {
		setLoading(true);
		setFinal('');
		try {
			await getArticleStream(airId, (chunk) => {
				setFinal((prev) => prev + chunk);
			}, provider);

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
		await updateBlogPostData(airId, {'AI Final Output (Blogpost)': final});
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 350);
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
	}, [final]);

	return (
		<Container sx={{position: 'relative'}}>
			<Button sx={{
				left: !final ? '50%' : 0,
				top: !final ? '15rem' : 0,
				transform: !final ?'translateX(-50%)' : 'translateX(0)'
			}}
				variant={'outlined'}
				color={'secondary'}
				onClick={resultStream}
			>Generate</Button>
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
			{loading && <FullPageLoader/>}
		</Container>
	);
};

export default CosOutputs;
