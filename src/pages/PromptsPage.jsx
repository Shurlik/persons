import React, {useState} from 'react';
import useSWR from "swr";
import {getPrompts, updatePrompt} from "../services/airtable";
import Loader from "../components/Loader";
import {
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
	Typography
} from "@mui/material";
import {colors} from "../assets/styles/colors";
import {localStyles} from "./ArticlesPage";
import {toast} from "react-toastify";
import FullPageLoader from "../components/FullPageLoader";
import PageHeader from "../components/PageHeader";
import {paginationModel} from "../utils/helpers";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment/moment";

const PromptsPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/cos/prompts', () => getPrompts());
	const [selected, setSelected] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState('');
	const [loading, setLoading] = useState(false);

	if (!data?.response) {
		return <Loader/>;
	}

	const handleEdit = () => {
		setIsEditing(true);
		setEditedContent(selected.Content);
	};

	const handleSave = async () => {
		setLoading(true);
		try {
			await updatePrompt(selected.id, {data: {Content: editedContent}});
			setSelected({...selected, Content: editedContent});
			setIsEditing(false);
			mutate(); // Обновляем данные в SWR
			setLoading(false);
			toast.success('Updated!');
		} catch (error) {
			console.error("Error updating prompt:", error);
			toast.error('Something goes wrong');
			setLoading(false);

		} finally {
			setLoading(false);

		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedContent('');
	};

	const columns = [
		{field: 'title', headerName: 'Title', flex: 3},
		{field: 'updated', headerName: 'Last update', flex: 1},
		{
			flex: 1,
			field: 'view',
			type: 'actions',
			headerName: 'Click to View',
			getActions: (params) => [
				<GridActionsCellItem
					icon={<RemoveRedEyeIcon sx={{color: colors.orange}}/>}
					label='Action'
					onClick={(event) => {
						event.stopPropagation(); // Предотвращаем выделение строки
						const prompt = data.response?.find(prompt => prompt.id === params.id);
						setSelected(prompt);
					}}
				/>
			],
		}
	];

	const rows = data.response.map((a, index) => ({
		id: a.id,
		title: a?.Name,
		updated: moment(a.created).format('YYYY-MM-DD'),
	}));

	return (
		<Container
			sx={{
				position: 'relative'
			}}
		>
			<PageHeader header={'System Prompts'}/>
			<DataGrid
				disableColumnFilter
				rows={rows}
				columns={columns}
				initialState={{pagination: {paginationModel}}}
				pageSizeOptions={[10, 20]}
				rowHeight={75}
				disableColumnSelector
				disableRowSelectionOnClick
				disableMultipleRowSelection
			/>
			<Drawer
				anchor={'right'}
				open={!!selected}
				onClose={(isEditing || loading) ? undefined : () => {
					setSelected(null);
					setIsEditing(false);
				}}
				PaperProps={{
					sx: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
			>
				<Box
					sx={{
						width: '60rem',
						borderTop: `1px solid ${colors.orange}`,
						borderLeft: `1px solid ${colors.orange}`,
						borderBottom: `1px solid ${colors.orange}`,
						height: '100%',
						borderRadius: '1rem 0 0 1rem',
						backgroundColor: colors.background,
						padding: '4rem',
						overflow: 'hidden',
						boxSizing: 'border-box',
						position: 'relative'
					}}
				>
					<Box
						sx={{
							overflow: 'auto',
							height: '100%',
							'&::-webkit-scrollbar': {
								width: '10px',
								borderRadius: '4px',
							},
							'&::-webkit-scrollbar-track': {
								borderRadius: '4px',
								backgroundColor: colors.orange20,
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: colors.orange,
								borderRadius: '4px',
								width: '20px'
							},
						}}
					>
						<Typography
							variant={'h3'}
							sx={{color: colors.mainGreen, textAlign: 'center', marginTop: '1rem'}}
						>
							{selected?.Title}
						</Typography>
						{isEditing ? (
							<>
								<TextField
									fullWidth
									multiline
									rows={30}
									value={editedContent}
									onChange={(e) => setEditedContent(e.target.value)}
									sx={{
										marginTop: '2rem',
										'& .MuiInputBase-input': {
											color: colors.blackPermanet,
										},
										'& .MuiOutlinedInput-root': {
											'& fieldset': {
												borderColor: colors.orange,
											},
											'&:hover fieldset': {
												borderColor: colors.mainGreen,
											},
											'&.Mui-focused fieldset': {
												borderColor: colors.mainGreen,
											},
										},
									}}
								/>
								<Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
									<Button
										onClick={handleCancel}
										sx={{marginRight: '1rem'}}
										variant='outlined'
										color='secondary'
									>
										Cancel
									</Button>
									<Button
										onClick={handleSave}
										variant='contained'
										color='primary'
									>
										Save
									</Button>
								</Box>
							</>
						) : (
							<>
								<Typography
									variant={'h6'}
									sx={{
										marginTop: '3rem',
										lineHeight: 1.5
									}}
								>
									{selected?.Content}
								</Typography>
								<Button
									onClick={handleEdit}
									sx={{
										position: 'absolute',
										top: '15px',
										left: '15px'
									}}
									variant='contained'
									color='primary'
								>
									Edit
								</Button>
							</>
						)}
					</Box>
					{loading && <FullPageLoader position={'absolute'}/>}
				</Box>
			</Drawer>
		</Container>
	);
};

export default PromptsPage;
