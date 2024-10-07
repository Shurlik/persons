import React, {useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {colors} from "../assets/styles/colors";
import DropMenu from "./DropMenu";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import AddUserModal from "./AddUserModal";


const UsersList = ({
	                   users,
	                   handleDeleteUser,
	                   handleEditUser,
	                   disabled,
	                   detailsHandler
                   }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [id, setId] = useState(null);
	const open = Boolean(anchorEl);

	const navigate = useNavigate();


	const handleClick = (event, id) => {
		setAnchorEl(event.currentTarget);
		setId(id);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setId(null);
	};


	const deleteHandler = () => {
		setAnchorEl(null);
		handleDeleteUser(id);
		setId(null);
	};

	const detailHandler = () => {
		navigate(`/users/${id}`);
	};

	const MENU_DATA = [
		{title: 'Details', icon: AccountBoxIcon, fn: detailHandler},
		{title: 'Delete', icon: DeleteOutlinedIcon, fn: deleteHandler, color: colors.red},
	];
	return (
		<TableContainer
			sx={{backgroundColor: colors.background, borderRadius: '1.5rem', padding: '2rem'}}
		>
			<Table
				aria-label='simple table'
			>
				<TableHead>
					<TableRow>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Username</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Name</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Email</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Role</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Created At</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{/*=======*/}
					{users.map((user) => (
						<TableRow
							key={user.id}
							sx={{backgroundColor: user?.active ? colors.mainGreen10 : colors.red20}}
						>
							<TableCell>
								{user?.username}
							</TableCell>
							<TableCell>
								{user?.name}
							</TableCell>
							<TableCell>
								{user?.email}
							</TableCell>
							<TableCell>
								{user?.role}
							</TableCell>
							<TableCell>
								{moment(user?.createdAt).format('YYYY-MM-DD')}
							</TableCell>
							<TableCell>
								<MoreVertIcon
									disabled={disabled}
									onClick={(event) => handleClick(event, user.id)}
									sx={{
										cursor: 'pointer'
									}}
								/></TableCell>

						</TableRow>
					))}
				</TableBody>
			</Table>
			<DropMenu
				disabled={disabled}
				onClose={handleClose}
				open={open}
				data={MENU_DATA}
				anchorEl={anchorEl}
			/>

		</TableContainer>
	);
};

export default UsersList;
