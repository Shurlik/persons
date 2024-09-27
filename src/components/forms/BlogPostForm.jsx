import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
	Box,
	Button,
	Container,
	DialogActions,
	FormControl,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import PageHeader from "../PageHeader";
import useSWR from "swr";
import {getLists, uploadBlogPostData} from "../../services/airtable";
import Loader from "../Loader";
import {loginInputStyles} from "../../services/inputStyles";
import {toast} from "react-toastify";
import Grid from '@mui/material/Grid2';
import {colors} from "../../assets/styles/colors";
import axios from "axios";

const BlogPostForm = ({person, selectedValues, setResearch, setSteps, setAirId}) => {
	const {handleSubmit, control, reset} = useForm();
	const {data = [], error, isLoading, mutate} = useSWR('/lists', getLists);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setLoading(true);

		const persPrompt = '\n\n!!! IMPORTANT !!! für eine Persona mit folgenden Merkmalen:\n';
		const starterString = person ? `Name: ${person?.fields?.Name};\nAge: ${person?.fields?.Age};\nGender: ${person?.fields?.Gender};\nPlace of residence: ${person?.fields['Place of residence']};\nJob title: ${person?.fields['Job title']};\n` : "";
		const aboutUser = selectedValues.reduce((acc, curr) => acc + `${curr}: ${person?.fields[curr]};\n`, starterString);

		const newForm = {
			"Blog Title": data?.title,
			"Brand Asset": ["reciAkXMfTGHYfAXR"],
			"Assignee": [{id: "usrVAFHfpENuQIP6z"}],
			"Blogpost Template Prompts": data?.postType,
			// "Publish Date": moment(data?.publishDateTime).format('YYYY-MM-DD'),
			// "Writing Brand Voice": data?.writingGuidelines,
			"Extra Context Instruction": `${data?.extraContext}`,
			"Secondary Keyword": data.secondaryKeyword,
			"Primary Keyword": data.primaryKeyword,
			"Writing Brand Voice": 'Friendly',
			"Persona data": aboutUser
		};

		// const newForm = {
		// 	title: data.title,
		// 	primaryKeyword: data.primaryKeyword,
		// 	secondaryKeyword: data.secondaryKeyword,
		// 	extra: `${data?.extraContext}${person ? persPrompt + ' ' + aboutUser : ''}`,
		// 	blogpostTemplatePrompts: data.postType,
		// 	language: 'German',
		// 	brandVoice: 'Friendly'
		// }

		if (!newForm['Blogpost Template Prompts'].length) {
			setLoading(false);
			toast.warning("Please select type of post");
			return;
		}

		for (const key in newForm) {
			if (!newForm[key]) {
				setLoading(false);
				toast.warning("Please fill all fields");
				return;
			}
		}

		try {
			// const res = await startResearch({data: newForm});
			const res = await uploadBlogPostData({data: newForm});
			setAirId(res.postData.id);
			const result = await axios(`https://hook.eu2.make.com/4kwge4k6ylha37wca5joxqz19ab4icys?record_id=${res.postData.id}`);
			setResearch(result.data);
			setSteps(null);
			setTimeout(() => setSteps(2), 350);
			// reset();
			toast.success('Success!');
		} catch (e) {
			toast.error('Something goes wrong!');
			console.log('Form adding error: ', e);
		} finally {
			setLoading(false);
		}

	};

	const menuBrandAssets = !isLoading ? data.BrandAssets.map((item) => <MenuItem
		key={item.fieldName}
		value={item.id}
	>{item.fieldName}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	const menuTemplatePrompts = !isLoading ? data.BlogpostTemplatePrompts.map((item) => <MenuItem
		key={item.fieldName}
		value={item.id}
	>{item.fieldName}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	const menuReelsHookPrompts = !isLoading ? data.reelsVideoHookPrompt.map((item) => <MenuItem
		key={item.fieldName}
		value={item.id}
	>{item.fieldName}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	const assigneeItem = !isLoading && data.BlogpostBase.length > 0 ? data.BlogpostBase[0].fieldName[0] : null;
	const nextHandler = () => {
	};

	return (
		<Container sx={{position: 'related'}}>
			<PageHeader
				header={'New Blog Post Production'}
				sx={{flexGrow: 1}}
			/>
			<Box
				sx={{
					margin: '0 auto'
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={2}
					>

						{/* Blog Post Title */}
						<Grid
							size={8}
						>
							<Typography
								variant='subtitle1'
								gutterBottom
							>
								What is the title of this blog post?
							</Typography>
							<Controller
								name='title'
								control={control}
								defaultValue=''
								render={({field}) => (
									<TextField
										{...field}
										fullWidth
										variant='outlined'
										required
										disabled={loading}
									/>
								)}
							/>
						</Grid>


						{/*/!* Brand Asset *!/*/}
						{/*<Grid*/}
						{/*	size={6}*/}
						{/*>*/}
						{/*	<Typography*/}
						{/*		variant='subtitle1'*/}
						{/*		gutterBottom*/}
						{/*	>*/}
						{/*		Add Brand Asset*/}
						{/*	</Typography>*/}
						{/*	<Controller*/}
						{/*		name='brandAsset'*/}
						{/*		control={control}*/}
						{/*		defaultValue={[]}*/}
						{/*		render={({field}) => (*/}
						{/*			<FormControl fullWidth>*/}
						{/*				<Select*/}
						{/*					{...field}*/}
						{/*					// sx={loginInputStyles}*/}
						{/*					variant='standard'*/}
						{/*					multiple*/}
						{/*					disabled={loading}*/}
						{/*				>*/}
						{/*					{menuBrandAssets}*/}
						{/*				</Select>*/}
						{/*			</FormControl>*/}
						{/*		)}*/}
						{/*	/>*/}
						{/*</Grid>*/}

						{/*/!* Add Assignee *!/*/}
						{/*<Grid*/}
						{/*	size={6}*/}
						{/*>*/}
						{/*	<Typography*/}
						{/*		variant='subtitle1'*/}
						{/*		gutterBottom*/}
						{/*	>*/}
						{/*		Add Assignee*/}
						{/*	</Typography>*/}
						{/*	<Controller*/}
						{/*		name='assignee'*/}
						{/*		control={control}*/}
						{/*		defaultValue={[]}*/}
						{/*		render={({field}) => (*/}
						{/*			<FormControl fullWidth>*/}
						{/*				<Select*/}
						{/*					{...field}*/}
						{/*					// sx={loginInputStyles}*/}
						{/*					variant='standard'*/}
						{/*					multiple*/}
						{/*					disabled={loading}*/}
						{/*				>*/}
						{/*					{assigneeItem ? (*/}
						{/*						<MenuItem value={assigneeItem.id}>{assigneeItem.name}</MenuItem>*/}
						{/*					) : (*/}
						{/*						<MenuItem value=''>No assignee available</MenuItem>*/}
						{/*					)}*/}
						{/*				</Select>*/}
						{/*			</FormControl>*/}
						{/*		)}*/}
						{/*	/>*/}
						{/*</Grid>*/}

						{/* Type of Post - MultiSelect */}
						<Grid
							size={6}
						>
							<Typography
								variant='subtitle1'
								gutterBottom
							>
								Choose what type of post this will be
							</Typography>
							<Controller
								name='postType'
								control={control}
								defaultValue={[]}
								render={({field}) => (
									<FormControl fullWidth>
										<Select
											disabled={loading}
											{...field}
											sx={{marginTop: '3px'}}
											variant='outlined'
											// variant='standard'
											multiple
										>
											{menuTemplatePrompts}
										</Select>
									</FormControl>
								)}
							/>
						</Grid>


						{/*/!* Publish Date and Time *!/*/}
						{/*<Grid*/}
						{/*	size={6}*/}
						{/*>*/}
						{/*	<Typography*/}
						{/*		variant='subtitle1'*/}
						{/*		gutterBottom*/}
						{/*	>*/}
						{/*		Publish Date*/}
						{/*	</Typography>*/}
						{/*	<Controller*/}
						{/*		name='publishDateTime'*/}
						{/*		control={control}*/}
						{/*		defaultValue={null}*/}
						{/*		render={({field}) => (*/}
						{/*			<DatePicker*/}
						{/*				disabled={loading}*/}
						{/*				sx={loginInputStyles}*/}
						{/*				variant='standard'*/}
						{/*				{...field}*/}
						{/*				slotProps={{*/}
						{/*					textField: {*/}
						{/*						fullWidth: true,*/}
						{/*						variant: 'outlined'*/}
						{/*					},*/}
						{/*				}}*/}
						{/*			/>*/}
						{/*		)}*/}
						{/*	/>*/}
						{/*</Grid>*/}
						{/*===*/}
						{/* Primary Keyword */}
						<Grid
							size={8}
						>
							<Typography
								variant='subtitle1'
								gutterBottom
							>
								Primary Keyword
							</Typography>
							<Controller
								name='primaryKeyword'
								control={control}
								defaultValue=''
								render={({field}) => (
									<TextField
										disabled={loading}
										{...field}
										fullWidth
										// sx={loginInputStyles}
										variant='outlined'
									/>
								)}
							/>
						</Grid>

						{/* Secondary Keyword */}
						<Grid
							size={8}
						>
							<Typography
								variant='subtitle1'
								gutterBottom
							>
								Secondary Keyword
							</Typography>
							<Controller
								name='secondaryKeyword'
								control={control}
								defaultValue=''
								render={({field}) => (
									<TextField
										disabled={loading}
										{...field}
										fullWidth
										// sx={loginInputStyles}
										variant='outlined'
									/>
								)}
							/>
						</Grid>

						{/* Extra Context */}
						<Grid
							size={9}
						>
							<Typography
								variant='subtitle1'
								gutterBottom
							>
								Provide extra context for your blog post
							</Typography>
							<Controller
								name='extraContext'
								control={control}
								defaultValue=''
								render={({field}) => (
									<TextField
										{...field}
										fullWidth
										// sx={loginInputStyles}
										variant='outlined'
										multiline
										rows={6}
										required
										disabled={loading}
									/>
								)}
							/>
						</Grid>


						{/*===*/}

						{/* Submit and Clear buttons */}
						<Grid

							mt={5}
							size={12}
							// container
							justifyContent='space-between'
						>
							<DialogActions sx={{marginTop: '3rem'}}>
								<Button
									onClick={nextHandler}
									variant={'contained'}
									color={'primary'}
									sx={{width: '100%'}}
									type={'submit'}
								>Next step</Button>
							</DialogActions>
						</Grid>
					</Grid>
				</form>
			</Box>
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
					backgroundColor: colors.black20
				}}
			><Loader/></Box>}
		</Container>
	);
};

export default BlogPostForm;
