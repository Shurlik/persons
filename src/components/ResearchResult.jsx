import React, {useEffect, useRef, useState} from 'react';
import {Button, Container} from "@mui/material";
import {updateBlogPostData} from "../services/airtable";
import {toast} from "react-toastify";
import OutputsTextField from "./OutputsTextField";
import ToggleEdit from "./ToggleEdit";
import {getResearchStream} from "../services/cos";
import authService from "../services/auth";
import FullPageLoader from "./FullPageLoader";
import useSWRSubscription from "swr/subscription";

const ResearchResult = ({research, setResearch, setSteps, airId, steps, setOutline}) => {
	const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(false);
	const resultBoxRef = useRef(null);


	const controllerRef = useRef(null);
	const resultStream = async () => {
		setLoading(true);
		setResearch('');
		try {
			await getResearchStream(airId, (chunk) => {
				setResearch((prev) => prev + chunk);
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

		const researchHandler = async () => {
			setLoading(true);
			const data = {"AI Output (Research)": research};

			try {
				const res = await updateBlogPostData(airId, data);
				toast.success('Success!');
				setSteps(null);
				setTimeout(() => setSteps(steps += 1), 350);
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
			setTimeout(() => setSteps(steps -= 1), 400);
		};

		useEffect(() => {
			if (resultBoxRef.current) {
				resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
			}
		}, [research]);

		return (
			<Container sx={{width: '100%', position: 'relative', transition: '1s'}}>
				<Button sx={{
					left: !research ? '50%' : 0,
					top: !research ? '15rem' : 0,
					transform: !research ?'translateX(-50%)' : 'translateX(0)'
				}}
					variant={'outlined'}
					color={'secondary'}
					onClick={resultStream}
				>Generate</Button>
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
					isEdit={edit}
					onClick={() => setEdit(old => !old)}
				/>
				{ loading && <FullPageLoader/>}
			</Container>
		);
	};

	export default ResearchResult;
