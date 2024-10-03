import React, {useState} from 'react';
import useSWR from "swr";
import {deleteUser, getUsers} from "../services/airtable";
import {Box, Container} from "@mui/material";
import PageHeader from "../components/PageHeader";
import {colors} from "../assets/styles/colors";
import Loader from "../components/Loader";
import UsersList from "../components/UsersList";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddUserModal from "../components/AddUserModal";
import {toast} from "react-toastify";

const UsersPage = () => {
	const [loading, setLoading] = useState(false);
	const {data = {}, error, isLoading, mutate} = useSWR(`/users`, () =>
		getUsers()
	);
	const [modalOpen, setModalOpen] = useState(false);
	const openModalHandler = () => {
		setModalOpen(true);
	};

	const handleDeleteUser = async (id) => {
		if (window.confirm("Are you sure you want to delete this person?")) {
			setLoading(true);
			try {
				await deleteUser(id);
				toast.success('User was deleted successfully!');
				await mutate();
				setLoading(false);
			} catch (error) {
				toast.error('Error deleting record!');
				console.error("Error deleting record:", error);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<PageHeader header={'Manage Users'}/>
				<Box
					onClick={openModalHandler}
					sx={{
						cursor: 'pointer',
						transition: '.3s',
						color: colors.mainGreen,
						'&:hover': {
							color: colors.orange
						}
					}}
				>
					<PersonAddIcon
						sx={{
							color: 'inherit',
							width: '2rem',
							height: '2rem'
						}}
					/>
				</Box>
			</Box>
			<Box
				display='flex'
				justifyContent={'start'}
				alignItems={'start'}
			>
				{isLoading ? <Loader/> : <UsersList
					disabled={loading}
					users={data?.response}
					handleDeleteUser={handleDeleteUser}
				/>}
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
			<AddUserModal
				onClose={() => setModalOpen(false)}
				isOpen={modalOpen}
				callback={mutate}
			/>
		</Container>
	);
};

export default UsersPage;
