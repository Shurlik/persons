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

	return (
		<Container
			sx={{
				position: 'relative'
			}}
		>
			<nav aria-label='main mailbox folders'>
				<List
					sx={{
						// backgroundColor: colors.background,
						borderRadius: '1rem',
						height: '100%'
					}}
				>
					{data.response
						.sort((a, b) => a.Title.localeCompare(b.Title))
						.map((prompt, index) => (
							<Box key={prompt.Name + index}>
								<ListItem
									disablePadding
								>
									<ListItemButton
										sx={localStyles}
										selected={prompt.id === selected?.id}
										onClick={() => setSelected(prompt)}
									>
										<ListItemText
											primary={prompt.Title}
											sx={{
												'& .MuiListItemText-primary': {
													fontSize: '1.5rem',
													color: 'inherit', // Задайте нужный цвет
												}
											}}
										/>
									</ListItemButton>
								</ListItem>
								<Divider
									color={colors.darkGrey42}
									variant={'middle'}
								/>
							</Box>
						))}
				</List>
			</nav>
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
							sx={{color: colors.mainGreen, textAlign: 'center'}}
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
											color: colors.black,
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
