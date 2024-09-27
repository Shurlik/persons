import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {getContent, updateBlogPostData} from "../services/airtable";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import {loginInputStyles} from "../services/inputStyles";
import {toast} from "react-toastify";
import Loader from "./Loader";
import {useNavigate} from "react-router-dom";
import OutputsTextField from "./OutputsTextField";
import PageHeader from "./PageHeader";

const CosFinal = ({airId, selectedImageId}) => {
	const {data = {}, error, isLoading, mutate} = useSWR(`/cos/content/${airId}`, () =>
		getContent(airId)
	);

	const navigate = useNavigate();


	const [article, setArticle] = useState('');
	const [loading, setLoading] = useState(false);

	const saveHandler = async () => {
		setLoading(true);
		const data = {
			"AI Final Output (Blogpost)": article, "Article Image": [
				{
					url: selectedImageId.url
				}
			]
		};
		try {
			await updateBlogPostData(airId, data);
			toast.success('Success!');
			setLoading(false);
			navigate('/articles', {replace: true});
		} catch (e) {
			console.log('error: ', e);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (data) {
			setArticle(data?.content?.fields['AI Final Output (Blogpost)']);
		}
	}, [data]);


	return (
		<Container>
			<PageHeader
				header={'Final Image'}
				sx={{flexGrow: 1}}
			/>
			<Box
				sx={{
					width: '20rem',
				}}
			>
				<Box
					component={'img'}
					alt={'img'}
					src={selectedImageId.url}
					sx={{width: '100%', height: '100%', objectFit: 'cover',}}
				/>

			</Box>
			<OutputsTextField
				title={'Article'}
				loading={loading}
				onChange={(event) => setArticle(event.target.value)}
				value={article}
			/>

			<Button
				onClick={saveHandler}
				variant={'contained'}
				color={'primary'}
				sx={{width: '100%', marginTop: '3rem'}}
				disabled={loading}
			>Save Article</Button>
			{loading && <Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: colors.black20,
					flexDirection: 'column'
				}}
			>
				<Loader/></Box>}
		</Container>
	);
};

export default CosFinal;
