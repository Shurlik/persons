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
	Typography
} from "@mui/material";
import officeGirl from "../assets/images/cartoon-office-girl.png";
import officeBoy from "../assets/images/cartoon-office-boy.png";
import {useNavigate} from "react-router-dom";
import {colors} from "../assets/styles/colors";
import Loader from "../components/Loader";
import RenderEditField from "../components/RenderEditField";
import RenderDetailFields from "../components/RenderDetailFields";

const ManagementPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/persons', async () => await getAllRecords());
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isViewingDetails, setIsViewingDetails] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editedFields, setEditedFields] = useState({});

	const navigate = useNavigate();

	const handleSelectPerson = (person) => {
		setSelectedPerson(person);
		setEditedFields(person.fields);
	};

	const handleEditPerson = () => {
		navigate('/generate', {
			state: {
				userId: selectedPerson.id
			}
		});
	};

	const handleViewDetails = () => {
		setIsViewingDetails(true);
	};

	const handleCloseDetails = () => {
		setIsViewingDetails(false);
		setIsEditing(false);
	};

	const handleCloseEdit = () => {
		// setIsEditing(false);
		// setEditedFields(selectedPerson.fields);
	};

	const handleFieldChange = (field, value) => {
		setEditedFields(prev => ({...prev, [field]: value}));
	};

	const handleSaveChanges = async () => {
		setLoading(true);
		try {
			await updateRecord(selectedPerson.id, editedFields);
			mutate();
			setIsEditing(false);
			setSelectedPerson(null);
		} catch (error) {
			console.error("Error updating record:", error);
		}
		setLoading(false);
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

	const sections = [
		{
			title: "Demographic Data",
			fields: ["Name",
				"Age",
				"Education level",
				"Occupation",
				"Income class",
				"Relationship Status",
				"Number of Kids",
				"Place of residence"]
		},
		{
			title: "Professional Information",
			fields: ["Job title",
				"Industry",
				"Career stage",
				"Working environment"]
		},
		{
			title: "Psychographic Characteristics",
			fields: ["Limbic Types",
				"Enneagram",
				"Myers-Briggs (MBTI)",
				"DISG",
				"Sinus-Milieus",
				"Spiral Dynamics",
				"Hobbies and Interests",
				"TV Shows / Books"]
		},
		{
			title: "Empathy Card",
			fields: ["Empathy Card"]
		},
		{
			title: "Values: What is important",
			fields: ["Important Values"]
		},
		{
			title: "Pain Points and Fears",
			fields: ["Pain Points", "Fears"]
		},
		{
			title: "Goals, Dreams, and Gains",
			fields: ["Goals and Dreams", "Materialistic Gains", "Emotional Win"]
		},
		{
			title: "Magical Solution",
			fields: ["Magical Solution"]
		},
		{
			title: "Brand",
			fields: ["Brand-Values", "Brand-Examples", "Brand Archetype", "Brand-Magnet"]
		},
		{
			title: "Elevator Pitch",
			fields: ["Elevator Pitch"]
		},
		{
			title: "Buying Behavior",
			fields: ["Buying Behavior", "Buying Motives", "Buying Barriers"]
		},
		{
			title: "Media Usage",
			fields: ["Preferred communication channels", "Device usage", "Online behavior"]
		}
	];

	if (isLoading) return <Typography>Loading...</Typography>;
	if (error) return <Typography>Error loading data</Typography>;

	return (
		<Container>
			<Typography
				variant='h3'
				gutterBottom
				sx={{
					textAlign: 'left',
					mt: 2,
					fontWeight: 'bold',
					color: colors.white
				}}
			>
				Manage Persons
			</Typography>
			<Box
				display='flex'
				justifyContent={'start'}
				alignItems={'start'}
			>
				<List sx={{width: '30%', marginRight: 2}}>
					{Array.isArray(data) && data.map((person) => (
						<ListItemButton
							sx={{
								transition: '.3s',
								border: '1px solid silver',
								borderRadius: '10px',
								marginY: '10px',
								backgroundColor: colors.darkGrey43,
								color: colors.white,
								fontWeight: 'bold',
								'&:hover': {
									backgroundColor: colors.silverDark
								},
								'&.Mui-selected': {
									backgroundColor: colors.silverDark,
									color: 'white',
								},
								'&.Mui-selected:hover': {
									backgroundColor: colors.silverDark
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
						backgroundColor: colors.black,
						borderRadius: '2rem',
						padding: '1rem 2rem',
						color: colors.white,
						transition: '.7s',
						overflow: 'hidden',
						marginTop: '12px'
					} : {}}
				>
					{selectedPerson && (
						<>
							<Typography variant='h4'>{selectedPerson.fields.Name}</Typography>
							<Typography variant='h5'>Age: {selectedPerson.fields.Age}, {selectedPerson.fields['Job title']}</Typography>
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
							>
								From: {selectedPerson.fields['Place of residence']}
							</Typography>
							<Box sx={{mt: 10}}>
								<Button
									onClick={handleEditPerson}
									variant='contained'
									color='primary'
									sx={{marginX: 3,mt: 1, mb: 1, width: '7rem'}}
								>
									Generation
								</Button>
								<Button
									onClick={handleViewDetails}
									variant='contained'
									color='success'
									sx={{marginX: 3,mt: 1, mb: 1, width: '7rem'}}
								>
									Details
								</Button>
								<Button
									onClick={handleDeletePerson}
									variant='contained'
									color='error'
									sx={{marginX: 3,mt: 1, mb: 1, width: '7rem'}}
								>
									Delete
								</Button>
							</Box>
							<Dialog
								open={isViewingDetails}
								onClose={handleCloseDetails}
								maxWidth='md'
								fullWidth
							>
								<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
									{loading && <Box
										sx={{
											position: 'absolute',
											top: '40%',
											left: '50%',
											transform: 'translateX(-50%)'
										}}
									><Loader/></Box>}
									<DialogTitle>Person Details</DialogTitle>
									{isEditing && <DialogActions>
										<Button
											disabled={loading}
											color={'success'}
											variant={'contained'}
											onClick={handleSaveChanges}
											sx={{minWidth: '10rem'}}
										>Save</Button>
									</DialogActions>}
									<DialogActions>
										<Button
											disabled={loading}
											variant={'contained'}
											onClick={() => setIsEditing(old => !old)}
											sx={{minWidth: '10rem'}}
										>{!isEditing ? 'Edit Person' : "To View"}</Button>
									</DialogActions>
								</Box>
								<DialogContent>
									{isEditing ? <Box sx={{maxHeight: '70vh', overflowY: 'auto'}}>
										{sections.map((section) => <RenderEditField
											key={section.title}
											sectionTitle={section.title}
											fields={section.fields} {...{
											handleFieldChange,
											editedFields,
											loading
										}}/>)}
									</Box> : <Box sx={{maxHeight: '70vh', overflowY: 'auto'}}>
										{sections.map((section) => <RenderDetailFields
											sectionTitle={section.title}
											fields={section.fields} {...{selectedPerson}} />)}
									</Box>}
								</DialogContent>
								<DialogActions>
									<Button onClick={handleCloseDetails}>Close</Button>
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
