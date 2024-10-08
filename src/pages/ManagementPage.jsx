import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {deleteRecord, getAllRecords, uploadFile} from "../services/airtable";
import {Box, Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import PageHeader from "../components/PageHeader";
import PersonsList from "../components/PersonsList";
import FullPageLoader from "../components/FullPageLoader";

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


	const groupDeleteHandler = async () => {
		if (window.confirm("Are you sure you want to delete this persons?")) {
			setLoading(true);
			try {
				for (const p of listPersonsToDelete) {
					await deleteRecord(p);
				}
				await mutate();
				toast.success('Deleted successfully!');
				setListPersonsToDelete([]);
				setLoading(false);
			} catch (e) {
				toast.error('Something goes wrong');
				console.log('Pers del error: ', e);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleDeletePerson = async (id) => {
		if (window.confirm("Are you sure you want to delete this person?")) {
			setLoading(true);
			try {
				await deleteRecord(id);
				await mutate();
				setSelectedPerson(null);
				setLoading(false);
			} catch (error) {
				console.error("Error deleting record:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => setFile(null), [selectedPerson]);


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
			</Box>
			{loading && <FullPageLoader/>}
		</Container>
	);
};

export default ManagementPage;
