import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PageHeader from "../PageHeader";
import useSWR from "swr";
import { getLists } from "../../services/airtable";
import Loader from "../Loader";

const BlogPostForm = () => {
	const { handleSubmit, control, reset } = useForm();
	const { data = [], error, isLoading, mutate } = useSWR('/lists', getLists);

	const onSubmit = (data) => {
		// Handle form submission
	};

	const menuBrandAssets = !isLoading ? data.BrandAssets.map((item) => <MenuItem key={item.fieldName} value={item.id}>{item.fieldName}</MenuItem>) : <MenuItem value={null}><Loader /></MenuItem>
	const menuTemplatePrompts = !isLoading ? data.BlogpostTemplatePrompts.map((item) => <MenuItem key={item.fieldName} value={item.id}>{item.fieldName}</MenuItem>) : <MenuItem value={null}><Loader /></MenuItem>
	const menuReelsHookPrompts = !isLoading ? data.reelsVideoHookPrompt.map((item) => <MenuItem key={item.fieldName} value={item.id}>{item.fieldName}</MenuItem>) : <MenuItem value={null}><Loader /></MenuItem>

	const assigneeItem = !isLoading && data.BlogpostBase.length > 0 ? data.BlogpostBase[0].fieldName[0] : null;

	return (
		<Container>
			<PageHeader header={'New Blog Post Production'}/>
			<Box
				sx={{
					padding: '1rem',
					maxWidth: '25rem',
					margin: '0 auto'
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						{/* Brand Asset */}
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Add Brand Asset
							</Typography>
							<Controller
								name='brandAsset'
								control={control}
								defaultValue=''
								render={({ field }) => (
									<FormControl fullWidth>
										<Select
											{...field}
											variant='outlined'
										>
											{menuBrandAssets}
										</Select>
									</FormControl>
								)}
							/>
						</Grid>

						{/* Add Assignee */}
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Add Assignee
							</Typography>
							<Controller
								name='assignee'
								control={control}
								defaultValue=''
								render={({ field }) => (
									<FormControl fullWidth>
										<Select
											{...field}
											variant='outlined'
										>
											{assigneeItem ? (
												<MenuItem value={assigneeItem.id}>{assigneeItem.name}</MenuItem>
											) : (
												<MenuItem value=''>No assignee available</MenuItem>
											)}
										</Select>
									</FormControl>
								)}
							/>
						</Grid>

						{/* Publish Date and Time */}
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Publish Date and Time
							</Typography>
							<Controller
								name='publishDateTime'
								control={control}
								defaultValue={null}
								render={({ field }) => (
									<DateTimePicker
										{...field}
										slotProps={{
											textField: {
												fullWidth: true,
												variant: 'outlined'
											},
										}}
									/>
								)}
							/>
						</Grid>

						{/* Additional Writing Guidelines */}
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Additional writing voice and tone guidelines
							</Typography>
							<Controller
								name='writingGuidelines'
								control={control}
								defaultValue=''
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										variant='outlined'
										multiline
										rows={3}
									/>
								)}
							/>
						</Grid>

						{/* Blog Post Title */}
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								What is the title of this blog post?
							</Typography>
							<Controller
								name='title'
								control={control}
								defaultValue=''
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										variant='outlined'
										required
									/>
								)}
							/>
						</Grid>

						{/* Type of Post - MultiSelect */}
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Choose what type of post this will be
							</Typography>
							<Controller
								name='postType'
								control={control}
								defaultValue=''
								render={({ field }) => (
									<FormControl fullWidth>
										<Select
											{...field}
											variant='outlined'
										>
											<MenuItem value=''>
												<em>None</em>
											</MenuItem>
											{menuTemplatePrompts}
										</Select>
									</FormControl>
								)}
							/>
						</Grid>

						{/* Extra Context */}
						<Grid item xs={12}>
							<Typography variant="subtitle1" gutterBottom>
								Provide extra context for your blog post
							</Typography>
							<Controller
								name='extraContext'
								control={control}
								defaultValue=''
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										variant='outlined'
										multiline
										rows={4}
										required
									/>
								)}
							/>
						</Grid>

						{/* Submit and Clear buttons */}
						<Grid item xs={12} container justifyContent='space-between'>
							<Button variant='contained' color='primary' type='submit'>
								Submit
							</Button>
							<Button variant='outlined' onClick={() => reset()}>
								Clear Form
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Container>
	);
};

export default BlogPostForm;
