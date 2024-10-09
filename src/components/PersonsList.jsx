import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {colors} from "../assets/styles/colors";
import DropMenu from "./DropMenu";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {LINK} from "../services/variables";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {paginationModel} from "../utils/helpers";
import officeGirl from '../assets/images/cartoon-office-girl.png';
import officeBoy from '../assets/images/cartoon-office-boy.png';

const simulateDownloadClick = (url) => {
	const link = document.createElement('a');
	link.href = url;
	link.target = '_blank';
	link.rel = 'noopener noreferrer';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const PersonsList = ({
	                     persons,
	                     handleDeletePerson,
	                     handleEditPerson,
	                     listPersonsToDelete,
	                     setListPersonsToDelete,
	                     disabled
                     }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [id, setId] = useState(null);
	const open = Boolean(anchorEl);

	const navigate = useNavigate();


	const handleItemClick = (item) => {
		const downloadUrl = `${LINK}/files/download/${id}`;
		simulateDownloadClick(downloadUrl);
		handleClose();
	};

	const handleClick = (event, id) => {
		setAnchorEl(event.currentTarget);
		setId(id);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setId(null);
	};

	const editHandler = () => {
		navigate(`/persons/${id}`, {
			state: {
				edit: true
			}
		});
	};

	const downloadHandler = () => {
		const downloadUrl = `${LINK}/files/download/${id}`;
		simulateDownloadClick(downloadUrl);
		handleClose();
	};

	const deleteHandler = () => {
		handleDeletePerson(id);
		setAnchorEl(null);
		setId(null);
	};

	const detailHandler = (id) => {
		navigate(`/persons/${id}`);
	};

	const MENU_DATA = [
		{title: 'Edit', icon: DriveFileRenameOutlineIcon, fn: editHandler},
		{title: 'Download', icon: DownloadIcon, fn: downloadHandler},
		{title: 'Delete', icon: DeleteOutlinedIcon, fn: deleteHandler, color: colors.red},
	];

	const data = persons.map(p => ({
		id: p.id,
		name: p.fields['Name'],
		age: p.fields['Age'],
		location: p.fields['Country'],
		owner: p.user.name,
		image: p.fields['User Image']?.length > 0 ? p.fields['User Image'][0]?.url : p.fields['Gender'] === 'Female' ? officeGirl : officeBoy
	}));

	const columns = [
		{
			field: 'image', headerName: 'Image', flex: 2,
			headerAlign: 'center',
			renderCell: (params) => {
				return <Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100%'
					}}
				>
					<Box
						sx={{
							overflow: 'hidden',
							borderRadius: '50%',
							backgroundColor: colors.silver,
							width: '3.5rem',
							height: '3.5rem',
						}}
					>
						<Box
							component={'img'}
							alt={'logo'}
							src={params.value}
							sx={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)',}}
						/>
					</Box>
				</Box>;
			}
		},
		{field: 'name', headerName: 'Name', flex: 2},
		{field: 'age', headerName: 'Age', flex: 1, type: 'number'},
		{field: 'location', headerName: 'Location', flex: 3},
		{field: 'owner', headerName: 'Owner', flex: 2},
		{
			field: 'action', headerName: 'Actions', flex: 2,
			type: 'actions',
			renderCell: (params) =>( <Button
				disabled={disabled}
				onClick={() => detailHandler(params.id)}
				variant={'outlined'}
				color={'secondary'}
			>View details
			</Button>)
		},
		{
			field: 'button', headerName: '', flex: 1,
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

	const rows = data?.map(u => ({
		id: u.id,
		name: u.name,
		age: u.age,
		location: u.location,
		owner: u.owner,
		image: u.image
	}));

	const handleSelectionChange = (data) => {
		setListPersonsToDelete([...data]);
	};

	return (
		<Box sx={{width: '100%'}}>
			<DataGrid
				disableColumnFilter
				rowSelectionModel={listPersonsToDelete}
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

export default PersonsList;
