import React, {useState} from 'react';
import useSWR from "swr";
import {deleteRecord, getAllRecords, updateRecord} from "../services/airtable";
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItemButton,
	ListItemText,
	TextField,
	Typography
} from "@mui/material";
import officeGirl from "../assets/images/cartoon-office-girl.png";
import officeBoy from "../assets/images/cartoon-office-boy.png";

const ManagementPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/persons', () => getAllRecords());
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedFields, setEditedFields] = useState({});

	const handleSelectPerson = (person) => {
		setSelectedPerson(person);
		setEditedFields(person.fields);
	};

	const handleEditPerson = () => {
		setIsEditing(true);
	};

	const handleCloseEdit = () => {
		setIsEditing(false);
		setEditedFields(selectedPerson.fields);
	};

	const handleFieldChange = (field, value) => {
		setEditedFields(prev => ({...prev, [field]: value}));
	};

	const handleSaveChanges = async () => {
		try {
			await updateRecord(selectedPerson.id, editedFields);
			mutate();
			setIsEditing(false);
			setSelectedPerson(null);
		} catch (error) {
			console.error("Error updating record:", error);
		}
	};

	const handleDeletePerson = async () => {
		if (window.confirm("Are you sure you want to delete this person?")) {
			try {
				await deleteRecord(selectedPerson.id);
				mutate();
				setSelectedPerson(null);
			} catch (error) {
				console.error("Error deleting record:", error);
			}
		}
	};

	const renderEditFields = (sectionTitle, fields) => (
		<Box key={sectionTitle}>
			<Typography
				variant='h6'
				sx={{mt: 2, mb: 1, color: "#C400D7"}}
			>{sectionTitle}</Typography>
			{fields.map(field => (
				<TextField
					key={field}
					label={field}
					value={editedFields[field] || ''}
					onChange={(e) => handleFieldChange(field, e.target.value)}
					fullWidth
					margin='dense'
				/>
			))}
		</Box>
	);

	const sections = [
		{
			title: "Demographic Data",
			fields: ["Name", "Age", "Gender", "Education level", "Income class", "Place of residence (city, country, region)"]
		},
		{
			title: "Professional Information",
			fields: ["Job title", "Industry", "Career stage", "Working environment"]
		},
		{
			title: "Psychographic Characteristics",
			fields: ["Limbic Types", "Enneagram", "Myers-Briggs", "Spiral Dynamics", "Values and beliefs", "Lifestyle"]
		},
		{
			title: "Media Usage",
			fields: ["Preferred communication channels (Social Media, Email, traditional media etc.)", "Device usage (Smartphone, Desktop, Tablet)", "Online behavior (shopping preferences, sources of information)"]
		},
		{
			title: "Buying Behavior",
			fields: ["Buying motives", "Buying barriers", "Decision-making process (How does the persona make purchase decisions?)", "Brand preferences"]
		},
		{
			title: "Needs and challenges",
			fields: ["What does the persona need?", "What problems or challenges does it have?", "How can your product or service help?"]
		},
		{
			title: "Goals and Dreams",
			fields: ["Short- and long-term goals", "Personal or professional aspirations"]
		},
		{
			title: "Communication Preferences",
			fields: ["Tone and style of address that resonates best", "Visual preferences (colors, images, design)", "Archetypes", "What are the key messages that would convince the persona?"]
		}
	];

	if (isLoading) return <Typography>Loading...</Typography>;
	if (error) return <Typography>Error loading data</Typography>;

	return (
		<Container>
			<Typography
				variant='h3'
				gutterBottom
				textAlign={'center'}
				mt={2}
				fontWeight={'bold'}
			>Manage Persons</Typography>
			<Box display='flex' justifyContent={'center'} alignItems={'start'}>
				<List sx={{width: '30%', marginRight: 2}}>
					{data.map((person) => (
						<ListItemButton
							sx={{
								transition: '.3s',
								border: '1px solid silver',
								borderRadius: '10px',
								marginY: '10px',
								backgroundColor: '#231E39aa',
								color: '#B3B8CD',
								fontWeight: 'bold',
								'&:hover': {
									backgroundColor: '#231E39'
								},
								'&.Mui-selected': {
									backgroundColor: '#231E39',
									color: 'white',
								},
								'&.Mui-selected:hover': {
									backgroundColor: '#231E39'
								}
							}}
							key={person.id}
							onClick={() => handleSelectPerson(person)}
							selected={selectedPerson && selectedPerson.id === person.id}
						>
							<ListItemText primary={person.fields.Name}/>
						</ListItemButton>
					))}
				</List>
				<Box
					sx={selectedPerson ? {
						flexGrow: 1,
						textAlign: 'center',
						backgroundColor: '#231E39',
						borderRadius: '2rem',
						padding: '1rem 2rem',
						color: '#B3B8CD',
						transition: '.7s',
						overflow: 'hidden',
						marginTop: '12px'
					}: {}}
				>
					{selectedPerson && (
						<>
							<Typography
								variant='h4'
							>{selectedPerson.fields.Name}</Typography>
							<Typography
								variant='h5'
							>Age: {selectedPerson.fields.Age}, {selectedPerson.fields['Job title']}</Typography>
							<Box
								sx={{
									border: '1px solid silver',
									width: '150px',
									height: '150px',
									borderRadius: '50%',
									overflow: 'hidden',
									margin: '16px auto'
								}}
							>
								<Box
									component={'img'}
									alt={'user image'}
									src={selectedPerson.fields.Gender === 'Female' ? officeGirl : officeBoy}
									sx={{width: '100%'}}
								/>
							</Box>
							<Typography
								variant='h5'
								mt={3}
							>From: {selectedPerson.fields['Place of residence (city, country, region)']}</Typography>
							<Box
								sx={{
									mt: 10
								}}
							>
								<Button
									onClick={handleEditPerson}
									variant='contained'
									color='primary'
									sx={{mr: 3, mt: 1, mb: 1, width: '7rem'}}
								>
									Edit
								</Button>
								<Button
									onClick={handleDeletePerson}
									variant='contained'
									color='error'
									sx={{mt: 1, mb: 1, ml:3, width: '7rem'}}
								>
									Delete
								</Button>
							</Box>
							<Dialog
								open={isEditing}
								onClose={handleCloseEdit}
								maxWidth='md'
								fullWidth
							>
								<DialogTitle>Edit Person</DialogTitle>
								<DialogContent>
									<Box sx={{maxHeight: '70vh', overflowY: 'auto'}}>
										{sections.map(section => renderEditFields(section.title, section.fields))}
									</Box>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleCloseEdit}>Cancel</Button>
									<Button
										onClick={handleSaveChanges}
										color='primary'
									>Save</Button>
								</DialogActions>
							</Dialog>
						</>
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default ManagementPage;
