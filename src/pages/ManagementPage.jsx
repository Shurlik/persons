import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {deleteRecord, getAllRecords, updateRecord, uploadFile} from "../services/airtable";
import {Box, Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import PageHeader from "../components/PageHeader";
import PersonsList from "../components/PersonsList";
import {colors} from "../assets/styles/colors";
import Loader from "../components/Loader";

const ManagementPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/persons', async () => await getAllRecords());
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isViewingDetails, setIsViewingDetails] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editedFields, setEditedFields] = useState({});
	const [file, setFile] = useState(null);

	const [listPersonsToDelete, setListPersonsToDelete] = useState([]);


	const navigate = useNavigate();

	const handleSelectPerson = (person) => {
		setSelectedPerson(person);
		setEditedFields(person.fields);
	};

	const handleEditPerson = (id) => {
		navigate('/generate', {
			state: {
				userId: id
			}
		});
	};

	const handleFileUpload = async (id) => {
		setLoading(true);
		if (file) {
			const formData = new FormData();
			formData.append('file', file);
			try {
				const res = await uploadFile(id, formData);
				await mutate();
				setSelectedPerson(res);
				toast.success('Uploaded');
				setSelectedPerson(res);
			} catch (e) {
				console.log('error: ', e);
				toast.error('Uploaded error');
			}
		}
		setLoading(false);
	};

	function handleFileChange(e) {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	}


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
			const data = await updateRecord(selectedPerson.id, editedFields);
			await mutate();
			setIsEditing(false);
			setSelectedPerson(data);
			setIsViewingDetails(false);
		} catch (error) {
			console.error("Error updating record:", error);
		}
		setLoading(false);
	};

	const groupDeleteHandler = async () => {
		if (window.confirm("Are you sure you want to delete this persons?")) {
			setLoading(true)
			try {
				for (const p of listPersonsToDelete) {
					await deleteRecord(p);
				}
				await mutate();
				toast.success('Deleted successfully!')
				setListPersonsToDelete([])
				setLoading(false)
			} catch (e) {
				toast.error('Something goes wrong')
				console.log('Pers del error: ', e);
			} finally {
				setLoading(false)
			}
		}
	};

	const handleDeletePerson = async (id) => {
		if (window.confirm("Are you sure you want to delete this person?")) {
			setLoading(true)
			try {
				await deleteRecord(id);
				await mutate();
				setSelectedPerson(null);
				setLoading(false)
			} catch (error) {
				console.error("Error deleting record:", error);
			} finally {
				setLoading(false)
			}
		}
	};

	useEffect(() => setFile(null), [selectedPerson]);

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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<PageHeader header={'Manage Personas'}/>
				{listPersonsToDelete.length > 0 && <Button
					variant={'contained'}
					color={'primary'}
					onClick={groupDeleteHandler}
				>Delete selected</Button>}
			</Box>
			<Box
				display='flex'
				justifyContent={'start'}
				alignItems={'start'}
			>
				<PersonsList
					disabled={loading}
					persons={data}
					handleSelectPerson
					handleEditPerson={handleEditPerson}
					handleFileUpload={handleFileUpload}
					handleDeletePerson={handleDeletePerson}
					listPersonsToDelete={listPersonsToDelete}
					setListPersonsToDelete={setListPersonsToDelete}
				/>
				{/*<Box*/}
				{/*	sx={selectedPerson ? {*/}
				{/*		flexGrow: 1,*/}
				{/*		textAlign: 'center',*/}
				{/*		backgroundColor: colors.black,*/}
				{/*		borderRadius: '2rem',*/}
				{/*		padding: '1rem 2rem',*/}
				{/*		color: colors.white,*/}
				{/*		transition: '.7s',*/}
				{/*		overflow: 'hidden',*/}
				{/*		marginTop: '12px',*/}
				{/*		position: 'relative',*/}
				{/*	} : {}}*/}
				{/*>*/}
				{/*{selectedPerson && (*/}
				{/*	<>*/}
				{/*		<Box*/}
				{/*			sx={{*/}
				{/*				position: 'absolute',*/}
				{/*				top: '5%',*/}
				{/*				right: '5%',*/}
				{/*				color: colors.white,*/}
				{/*				cursor: 'pointer',*/}
				{/*				transition: '.3s',*/}
				{/*				'&:hover': {*/}
				{/*					transform: 'scale(1.3)'*/}
				{/*				}*/}
				{/*			}}*/}
				{/*		>*/}
				{/*			<a*/}
				{/*				target={'_blank'}*/}
				{/*				href={`${LINK}/files/download/${selectedPerson?.id}`}*/}
				{/*			><FileDownloadIcon sx={{width: '2rem', height: '2rem'}}/></a>*/}
				{/*		</Box>*/}
				{/*		<Typography variant='h4'>{selectedPerson.fields.Name}</Typography>*/}
				{/*		<Typography variant='h5'>Age: {selectedPerson.fields.Age}, {selectedPerson.fields['Job title']}</Typography>*/}
				{/*		<Box*/}
				{/*			sx={{*/}
				{/*				border: '1px solid silver',*/}
				{/*				width: '150px',*/}
				{/*				height: '150px',*/}
				{/*				borderRadius: '50%',*/}
				{/*				overflow: 'hidden',*/}
				{/*				margin: '16px auto',*/}
				{/*				display: 'flex',*/}
				{/*				justifyContent: 'center',*/}
				{/*				alignItems: 'center',*/}
				{/*			}}*/}
				{/*		>*/}
				{/*			{loading ? <Loader/> : <Box*/}
				{/*				component={'img'}*/}
				{/*				alt={'user image'}*/}
				{/*				src={selectedPerson.fields['User Image']?.length > 0 ? selectedPerson.fields['User Image'][0]?.url : selectedPerson.fields['Gender'] === 'Female' ? officeGirl : officeBoy}*/}
				{/*				sx={{width: '100%', height: '100%', objectFit: 'cover'}}*/}
				{/*			/>}*/}
				{/*		</Box>*/}
				{/*		<Typography*/}
				{/*			variant='h5'*/}
				{/*			mt={3}*/}
				{/*		>*/}
				{/*			From: {selectedPerson.fields['Place of residence']}*/}
				{/*		</Typography>*/}
				{/*		<Box sx={{marginTop: '1rem'}}>*/}
				{/*			{!!file && (<Box*/}
				{/*				sx={{*/}
				{/*					display: 'flex',*/}
				{/*					alignItems: 'center',*/}
				{/*					justifyContent: 'center',*/}
				{/*					gap: '1rem'*/}
				{/*				}}*/}
				{/*			><Typography component={'span'}>{file.name}</Typography><Box*/}
				{/*				onClick={loading ? () => {*/}
				{/*				} : () => setFile(null)}*/}
				{/*				component={'span'}*/}
				{/*				sx={{*/}
				{/*					cursor: 'pointer',*/}
				{/*					marginBottom: '5px'*/}
				{/*				}}*/}
				{/*			>❌</Box></Box>)}*/}
				{/*			{!file && <Button*/}
				{/*				onChange={handleFileChange}*/}
				{/*				sx={{marginTop: '.3rem'}}*/}
				{/*				component='label'*/}
				{/*				role={undefined}*/}
				{/*				variant='contained'*/}
				{/*				tabIndex={-1}*/}
				{/*				accept='image/*'*/}
				{/*				startIcon={<CloudUploadIcon/>}*/}
				{/*			>*/}
				{/*				Select file*/}
				{/*				<VisuallyHiddenInput*/}
				{/*					type='file'*/}
				{/*					accept='image/*'*/}
				{/*				/>*/}
				{/*			</Button>}*/}
				{/*			{file && <Button*/}
				{/*				disabled={loading}*/}
				{/*				onClick={handleFileUpload}*/}
				{/*				sx={{marginTop: '.3rem'}}*/}
				{/*				component='label'*/}
				{/*				role={undefined}*/}
				{/*				variant='contained'*/}
				{/*				tabIndex={-1}*/}
				{/*				startIcon={<CloudUploadIcon/>}*/}
				{/*			>*/}
				{/*				Upload file*/}
				{/*			</Button>}*/}
				{/*		</Box>*/}
				{/*		<Box sx={{mt: 10}}>*/}
				{/*			<Button*/}
				{/*				disabled={loading}*/}
				{/*				onClick={handleEditPerson}*/}
				{/*				variant='contained'*/}
				{/*				color='primary'*/}
				{/*				sx={{marginX: 3, mt: 1, mb: 1, width: '7rem'}}*/}
				{/*			>*/}
				{/*				Generation*/}
				{/*			</Button>*/}
				{/*			<Button*/}
				{/*				disabled={loading}*/}
				{/*				onClick={handleViewDetails}*/}
				{/*				variant='contained'*/}
				{/*				color='success'*/}
				{/*				sx={{marginX: 3, mt: 1, mb: 1, width: '7rem'}}*/}
				{/*			>*/}
				{/*				Details*/}
				{/*			</Button>*/}
				{/*			<Button*/}
				{/*				disabled={loading}*/}
				{/*				onClick={handleDeletePerson}*/}
				{/*				variant='contained'*/}
				{/*				color='error'*/}
				{/*				sx={{marginX: 3, mt: 1, mb: 1, width: '7rem'}}*/}
				{/*			>*/}
				{/*				Delete*/}
				{/*			</Button>*/}
				{/*		</Box>*/}
				{/*		<Dialog*/}
				{/*			open={isViewingDetails}*/}
				{/*			onClose={handleCloseDetails}*/}
				{/*			maxWidth='md'*/}
				{/*			fullWidth*/}
				{/*		>*/}
				{/*			<Box sx={{display: 'flex', justifyContent: 'space-between'}}>*/}
				{/*				{loading && <Box*/}
				{/*					sx={{*/}
				{/*						position: 'absolute',*/}
				{/*						top: '40%',*/}
				{/*						left: '50%',*/}
				{/*						transform: 'translateX(-50%)'*/}
				{/*					}}*/}
				{/*				><Loader/></Box>}*/}
				{/*				<DialogTitle>Person Details</DialogTitle>*/}
				{/*				{isEditing && <DialogActions>*/}
				{/*					<Button*/}
				{/*						disabled={loading}*/}
				{/*						color={'success'}*/}
				{/*						variant={'contained'}*/}
				{/*						onClick={handleSaveChanges}*/}
				{/*						sx={{minWidth: '10rem'}}*/}
				{/*					>Save</Button>*/}
				{/*				</DialogActions>}*/}
				{/*				<DialogActions>*/}
				{/*					<Button*/}
				{/*						disabled={loading}*/}
				{/*						variant={'contained'}*/}
				{/*						onClick={() => setIsEditing(old => !old)}*/}
				{/*						sx={{minWidth: '10rem'}}*/}
				{/*					>{!isEditing ? 'Edit Person' : "To View"}</Button>*/}
				{/*				</DialogActions>*/}
				{/*			</Box>*/}
				{/*			<DialogContent>*/}
				{/*				{isEditing ? <Box sx={{maxHeight: '70vh', overflowY: 'auto'}}>*/}
				{/*					{sections.map((section) => <RenderEditField*/}
				{/*						key={section.title}*/}
				{/*						sectionTitle={section.title}*/}
				{/*						fields={section.fields} {...{*/}
				{/*						handleFieldChange,*/}
				{/*						editedFields,*/}
				{/*						loading*/}
				{/*					}}/>)}*/}
				{/*				</Box> : <Box sx={{maxHeight: '70vh', overflowY: 'auto'}}>*/}
				{/*					{sections.map((section) => <RenderDetailFields*/}
				{/*						key={section.title}*/}
				{/*						sectionTitle={section.title}*/}
				{/*						fields={section.fields} {...{selectedPerson}} />)}*/}
				{/*				</Box>}*/}
				{/*			</DialogContent>*/}
				{/*			<DialogActions>*/}
				{/*				<Button onClick={handleCloseDetails}>Close</Button>*/}
				{/*			</DialogActions>*/}
				{/*		</Dialog>*/}
				{/*	</>*/}
				{/*)}*/}
				{/*</Box>*/}
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

export default ManagementPage;
