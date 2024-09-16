import React, {useState} from "react";
import {Box, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {colors} from "../assets/styles/colors";
import Logo from "../assets/images/cartoon-office-girl.png";
import DropMenu from "./DropMenu";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import officeGirl from "../assets/images/cartoon-office-girl.png";
import officeBoy from "../assets/images/cartoon-office-boy.png";
import {LINK} from "../services/variables";

const simulateDownloadClick = (url) => {
	const link = document.createElement('a');
	link.href = url;
	link.target = '_blank';
	link.rel = 'noopener noreferrer';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const PersonsList = ({persons, handleDeletePerson, handleEditPerson,}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [id, setId] = useState(null)
	const open = Boolean(anchorEl);


	const handleItemClick = (item) => {
			const downloadUrl = `${LINK}/files/download/${id}`;
			simulateDownloadClick(downloadUrl);
			handleClose()
	};

	const handleClick = (event,id) => {
		setAnchorEl(event.currentTarget);
		setId(id)
	};
	const handleClose = () => {
		setAnchorEl(null);
		setId(null)
	};

	const onSelectChange = () => {
	};

	const editHandler = () => {
		handleEditPerson(id)
	};
	const downloadHandler = () => {
		const downloadUrl = `${LINK}/files/download/${id}`;
		simulateDownloadClick(downloadUrl);
		handleClose()
	};
	const deleteHandler = () => {
		handleDeletePerson(id)
	};

	const MENU_DATA = [
		{title: 'Edit', icon: DriveFileRenameOutlineIcon, fn: editHandler},
		{title: 'Download', icon: DownloadIcon, fn: downloadHandler},
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
						> <Checkbox
							sx={{
								color: colors.white,
								'&.Mui-checked': {
									color: colors.white,
								},
							}}
							checked={true}
							onChange={(event) => onSelectChange('test', event.target.checked)}
						/></TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Name</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Age</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Location</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Action</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{/*=======*/}
					{persons.map((user) => (
						<TableRow
							key={user.id}
						>
							<TableCell>
								<Checkbox
									sx={{
										color: colors.white,
										'&.Mui-checked': {
											color: colors.white,
										},
									}}
									checked={true}
									onChange={(event) => onSelectChange('test', event.target.checked)}
								/>
							</TableCell>
							<TableCell
								// onClick={() => userDetailsHandler(user.id)}
							>
								<Box
									sx={{
										display: 'flex',
										gap: '.5rem',
										alignItems: 'center'
									}}
								>
									<Box
										sx={{
											overflow: 'hidden',
											borderRadius: '50%',
											backgroundColor: colors.silver,
											width: '1.8rem',
											height: '1.8rem',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Box
											component={'img'}
											alt={'logo'}
											src={user.fields['User Image']?.length > 0 ? user.fields['User Image'][0]?.url : user.fields['Gender'] === 'Female' ? officeGirl : officeBoy}
											sx={{width: '100%', height: '100%', objectFit: 'cover',filter: 'grayscale(100%)',}}
										/>
									</Box>{user?.fields.Name}</Box></TableCell>
							<TableCell
							>{user?.fields.Age}</TableCell>
							<TableCell>{user?.fields.Country}</TableCell>
							<TableCell><Button
								variant={'outlined'}
								color={'secondary'}
							>View details</Button></TableCell>
							<TableCell><MoreVertIcon
								onClick={(event)=> handleClick(event, user.id)}
								sx={{
									cursor: 'pointer'
								}}
							/></TableCell>

						</TableRow>
					))}
				</TableBody>
			</Table>
			<DropMenu
				onClose={handleClose}
				open={open}
				data={MENU_DATA}
				anchorEl={anchorEl}
			/>
		</TableContainer>
	);
};

export default PersonsList;
