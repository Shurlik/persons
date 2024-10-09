import React, {useState} from "react";
import {Box} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {colors} from "../assets/styles/colors";
import DropMenu from "./DropMenu";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {paginationModel} from "../utils/helpers";


const UsersList = ({
	                   users,
	                   handleDeleteUser,
	                   disabled,
	                   setUsersToDelete,
	                   usersToDelete
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

	const columns = [
		{field: 'username', headerName: 'Username', flex: 1},
		{field: 'name', headerName: 'Name', flex: 2},
		{field: 'email', headerName: 'Email', flex: 3},
		{field: 'role', headerName: 'Role', flex: 2},
		{field: 'created', headerName: 'Created At', flex: 2},
		{
			field: 'action', headerName: '', flex: 1,
			type: 'actions',
			getActions: (params) => [
				<GridActionsCellItem
					icon={<MoreVertIcon sx={{color: colors.orange}}/>}
					label='Action'
					onClick={(event) => handleClick(event, params.id)}
				/>
			],
		},
	];

	const rows = users?.map(u => ({
		id: u.id,
		username: u.username,
		name: u.name,
		email: u.email,
		role: u.role,
		created: moment(u.created).format('YYYY-MM-DD')
	}));

	const handleSelectionChange = (data) => {
		setUsersToDelete([...data]);
	};

	return (
		<Box sx={{width: '100%'}}>
			<DataGrid
				disableColumnFilter
				rowSelectionModel={usersToDelete}
				rows={rows}
				columns={columns}
				initialState={{pagination: {paginationModel}}}
				pageSizeOptions={[10, 20]}
				checkboxSelection
				rowHeight={75}
				disableColumnSelector
				disableRowSelectionOnClick
				onRowSelectionModelChange={(newSelection) => {
					handleSelectionChange(newSelection);
				}}
			/>
			<DropMenu
				disabled={disabled}
				onClose={handleClose}
				open={open}
				data={MENU_DATA}
				anchorEl={anchorEl}
			/>
		</Box>
	);
};

export default UsersList;
