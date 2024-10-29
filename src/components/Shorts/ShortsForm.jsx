import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, FormControl, Typography} from "@mui/material";
import {toast} from "react-toastify";
import PageHeader from "../PageHeader";
import useSWR from "swr";
import {getArticles} from "../../services/airtable";
import CustomSelect from "../CustomSelect";
import {getShortsTemplates} from "../../services/shorts";
import {getRandomIntRange} from "../../utils/helpers";
import CustomTextField from "../CustomTextField";

const ShortsForm = ({loading, setFormData, createShorts, steps, setSteps, selectedValues, person}) => {
	const location = useLocation();
	const articleId = location?.state?.articleId;
	const [showOptions, setShowOptions] = useState(false);
	const [noArticleSelected, setNoArticleSelected] = useState(true);

	const {data = [], error, isLoading, mutate} = useSWR(articleId ? null : '/cos/articles', () => getArticles());

	const {
		data: shortsTemplates = [],
	} = useSWR(articleId ? null : '/cos/shorts-templates', getShortsTemplates);


	const articles = !isLoading
		? [
			{label: 'None', value: ''},
			...data?.articles.map((p) => ({
				label: p?.fields?.['Blog Title'],
				value: p?.id
			}))
		]
		: [{label: 'Loading...', value: ''}];

	const schema = yup.object().shape({
		model: yup.string().required('AI model is required'),
	});

	const {control, reset, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			article: articleId || '',
			model: 'gpt',
			topic: "",
			cta: "",
		},
	});

	const onSubmit = async (data) => {


		if (noArticleSelected && !data.cta || noArticleSelected && !data.topic) {
			toast.warning('Please set Topic and/or Call to Action');
			return;
		}

		// Select randoms
		const tmplt = [];
		while (tmplt.length < 10) {
			const randomNumber = getRandomIntRange(1, shortsTemplates.length - 1);
			if (!tmplt.includes(shortsTemplates[randomNumber].id)) {
				tmplt.push(shortsTemplates[randomNumber].id);
			}
		}
		data.postType = tmplt;

		try {
			const starterString = person ? `Name: ${person?.fields?.Name};\nAge: ${person?.fields?.Age};\nGender: ${person?.fields?.Gender};\nPlace of residence: ${person?.fields['Place of residence']};\nJob title: ${person?.fields['Job title']};\n` : "";
			data.personData = selectedValues.reduce((acc, curr) => acc + `${curr}: ${person?.fields[curr]};\n`, starterString);

			setSteps(null);
			setTimeout(() => setSteps(steps += 1), 350);
			setFormData(data);
			await createShorts(data);
		} catch (e) {
			console.log('error: ', e);
		}
	};
	const previousStepHandler = () => {
		reset();
		setSteps(null);
		setTimeout(() => setSteps(steps -= 1), 400);
	};

	const options = [
		{value: 'gpt', label: 'Chat GPT'},
		{value: 'claude', label: 'Claude'},
	];

	const shortsPromptsOptions = !isLoading
		? [
			{label: 'None', value: ''},
			...shortsTemplates.map((p) => ({
				label: p?.SocialPromptName,
				value: p?.id
			}))
		]
		: [{label: 'Loading...', value: ''}];

	const randomHandler = () => {
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<PageHeader
				header={'Create Short posts for Article'}
				sx={{flexGrow: 1}}
			/>
			<Box
				sx={{
					display: 'flex',
					gap: '1rem'
				}}
			>
				<Box sx={{width: '20rem'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>Model: </Typography>
					<Controller
						name='model'
						control={control}
						render={({field}) => (
							<CustomSelect
								{...field}
								disabled={loading}
								options={options}
								label='Choose Model'
								onChange={(value) => field.onChange(value)}
								sx={{
									error: !!errors.model
								}}
							/>
						)}
					/>
					{errors.model && <Typography color='error'>{errors.model.message}</Typography>}
				</Box>
				<Box sx={{flex: '1 1'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Select Article
					</Typography>
					<FormControl
						fullWidth
						variant='outlined'
						sx={{mb: 2}}
					>
						<Controller
							name='article'
							control={control}
							render={({field}) => (
								<CustomSelect
									{...field}
									disabled={loading}
									options={articles}
									onChange={(value) => {
										if (value) {
											setNoArticleSelected(false);
										} else {
											setNoArticleSelected(true);
										}
										field.onChange(value);
									}}
									sx={{
										error: !!errors.article,
									}}
								/>
							)}
						/>
						{errors.article && <Typography color='error'>{errors.article.message}</Typography>}
					</FormControl>
				</Box>
			</Box>
			<Box>
				<Box>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Topic
					</Typography>
					<Controller
						name='topic'
						control={control}
						defaultValue=''
						render={({field}) => (
							<CustomTextField
								{...{field}}
								disabled={loading}
								multiline
								rows={4}
							/>
						)}
					/>
				</Box>
				<Box sx={{marginTop: '1rem'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Call to Action
					</Typography>
					<Controller
						name='cta'
						control={control}
						defaultValue=''
						render={({field}) => (
							<CustomTextField
								{...{field}}
								disabled={loading}
							/>
						)}
					/>
				</Box>
				{noArticleSelected && <Box sx={{marginTop: '1rem'}}>
					<Typography
						variant='subtitle1'
						gutterBottom
					>
						Words to exclude from content
					</Typography>
					<Controller
						name='excludedWords'
						control={control}
						defaultValue=''
						render={({field}) => (
							<CustomTextField
								{...{field}}
								disabled={loading}
							/>
						)}
					/>
				</Box>}
			</Box>

			<Box
				sx={{
					padding: '5rem 0 0',
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem'
				}}
			>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					disabled={loading}
				>
					{`Submit`}
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
		</Box>
	);
};

export default ShortsForm;
