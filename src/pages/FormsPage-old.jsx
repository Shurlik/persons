import React, {useEffect, useState} from 'react';
import {
	Box,
	Divider,
	FormControl,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	MenuItem,
	Select,
	Typography
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {colors} from "../assets/styles/colors";
import BlogPostForm from "../components/forms/BlogPostForm";
import UserFormSelect from "../components/UserFormSelect";
import {loginInputStyles} from "../services/inputStyles";
import Loader from "../components/Loader";
import useSWR from "swr";
import {getAllRecords} from "../services/airtable";

const FORMS = ['Blog Post Form', 'Some other form', 'Once more form'];

const localStyles = {
	alignItems: "center", // Вместо alignVertical
	borderRadius: '.4rem',
	padding: '.6rem 0',
	color: colors.mainGreen,
	transition: '.5s',
	'&:hover': {
		backgroundColor: colors.backgroundMain,
		color: colors.orange
	},
	'&.Mui-selected': {
		backgroundColor: colors.backgroundMain,
		color: colors.orange,
		paddingLeft: '.8rem',
		'&:hover': {
			backgroundColor: colors.backgroundMain, // Сохраняем белый фон при наведении на выбранный элемент
		},
	},
};

const FormsPage = () => {
	const [selectedForm, setSelectedForm] = useState(1);
	const [person, setPerson] = useState('');
	const [selectedValues, setSelectedValues] = useState([]);

	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());

	const handleChange = async (event) => {
		setPerson(event.target.value);
	};

	const persons = !isLoading ? data.map((p) => <MenuItem
		key={p?.id}
		value={p}
	>{p?.fields?.Name}</MenuItem>) : <MenuItem value={null}><Loader/></MenuItem>;

	useEffect(() => {
		setPerson('');
	}, [selectedForm]);

	return (
		<Grid
			container
			spacing={2}
			sx={{padding: '5rem 3rem', maxWidth: '100rem', margin: '0 auto'}}
		>
			<Grid
				size={3}
			>
				<nav aria-label='main mailbox folders'>
					<List
						sx={{
							// backgroundColor: colors.background,
							borderRadius: '1rem',
							height: '100%'
						}}
					>
						{FORMS.map((title, index) => (
							<Box key={title}>
								<ListItem
									disablePadding
								>
									<ListItemButton
										sx={localStyles}
										selected={selectedForm === index + 1}
										onClick={() => setSelectedForm(index + 1)}
									>
										<ListItemText
											primary={title}
											sx={{
												'& .MuiListItemText-primary': {
													color: 'inherit', // Задайте нужный цвет
												}
											}}
										/>
									</ListItemButton>
								</ListItem>
								<Divider
									color={colors.darkGrey42}
									variant={'middle'}
								/>
							</Box>
						))}
					</List>
				</nav>
			</Grid>
			<Grid size={6}>
				<Box
					sx={{
						borderRadius: '1rem',
						backgroundColor: colors.background,
						color: 'white',
						padding: '2rem',
					}}
				>
					{selectedForm === 1 && <BlogPostForm person={person} selectedValues={selectedValues} setPerson={setPerson}/>}
					{selectedForm === 2 && <Typography variant={'h3'}>New form will be here</Typography>}
					{selectedForm === 3 && <Typography variant={'h3'}>Third form will be here</Typography>}
				</Box>
			</Grid>
			<Grid size={3}>
				<Box
					sx={{
						color: 'white',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						alignItems: 'center'
					}}
				>
					<Typography variant={'h5'}>Select Personas</Typography>
					<FormControl
						variant='standard'
						sx={{width: '100%'}}
					>
						<Select
							fullWidth
							sx={loginInputStyles}
							labelId='demo-simple-select-standard-label'
							value={person}
							onChange={handleChange}
							label='Person'
						>
							<MenuItem value={''}>
								<em>None</em>
							</MenuItem>
							{persons}
						</Select>
					</FormControl>
					{!!person && <UserFormSelect
						person={person}
						selectedValues={selectedValues}
						setSelectedValues={setSelectedValues}
					/>}
				</Box>
			</Grid>
		</Grid>
	);
};

export default FormsPage;
