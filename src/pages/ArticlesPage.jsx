import React, {useState} from 'react';
import useSWR from "swr";
import {deleteArticle, getArticles} from "../services/airtable";
import {Box, Button, Container, Drawer, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import Loader from "../components/Loader";
import FormattedTextDisplayArticle from "../components/FormattedTextDisplayArticle";
import moment from "moment";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DropMenu from "../components/DropMenu";
import PageHeader from "../components/PageHeader";
import {toast} from "react-toastify";
import FullPageLoader from "../components/FullPageLoader";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {paginationModel} from "../utils/helpers";

export const localStyles = {
	alignItems: "center", // Вместо alignVertical
	borderRadius: '.4rem',
	padding: '.6rem 0',
	color: colors.mainGreen,
	transition: '.5s',
	'&:hover': {
		backgroundColor: colors.backgroundMain,
		color: colors.orange
	},
	'&.Mui-selected': {
		backgroundColor: colors.backgroundMain,
		color: colors.orange,
		// paddingLeft: '.8rem',
		'&:hover': {
			backgroundColor: colors.backgroundMain, // Сохраняем белый фон при наведении на выбранный элемент
		},
	},
};

const ArticlesPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/cos/articles', () => getArticles());

	const [listArticlesToDelete, setListArticleToDelete] = useState([]);
	const [selected, setSelected] = useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [id, setId] = useState(null);

	const handleClick = (event, id) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setId(null);
	};

	const open = Boolean(anchorEl);

	if (!data?.articles) {
		return <Loader/>;
	}


	const editHandler = () => {

	};

	const downloadHandler = () => {
	};


	const articles = data.articles.map(d => ({
		id: d.id,
		title: d.fields['Blog Title'],
		content: d.fields['AI Final Output (Blogpost)'],
		image: d.fields["Article Image"],
		created: d.fields["Created Time"],
		user: d.user
	}));

	const columns = [
		{field: 'title', headerName: 'Title', flex: 3},
		{field: 'owner', headerName: 'Owner', flex: 1},
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
						const article = articles?.find(article => article.id === params.id);
						setSelected(article);
					}}
				/>
			],
		},
		{
			field: 'created',
			headerName: 'Created at',
			flex: 1
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			getActions: (params) => [
				<GridActionsCellItem
					icon={<MoreVertIcon sx={{color: colors.orange}}/>}
					label='Action'
					onClick={(event) => {
						event.stopPropagation(); // Предотвращаем выделение строки
						setId(params.id);
						handleClick(event);
					}}
				/>
			],
		}
	];

	const handleSelectionChange = (data) => {
		setListArticleToDelete([...data]);
	};

	const groupDeleteHandler = async () => {
		if (!listArticlesToDelete?.length) {
			return;
		}
		if (window.confirm("Are you sure you want to delete this Articles?")) {
			setLoading(true);
			try {
				for (const p of listArticlesToDelete) {
					await deleteArticle(p);
				}
				await mutate();
				toast.success('Deleted successfully!');
				setListArticleToDelete([]);
				setLoading(false);
			} catch (e) {
				toast.error('Something goes wrong');
				console.log('Article del error: ', e);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleDeleteArticle = async () => {
		if (!id) {
			return;
		}
		if (window.confirm("Are you sure you want to delete this Article?")) {
			setLoading(true);
			try {
				await deleteArticle(id);
				await mutate();
				toast.success('Deleted successfully!');
				setId(null);
				setAnchorEl(null);
				setLoading(false);
			} catch (e) {
				toast.error('Something goes wrong');
				console.log('Article del error: ', e);
			} finally {
				setLoading(false);
			}
		}
	};

	const rows = articles.map((a, index) => ({
		id: a.id,
		title: a?.title,
		owner: a?.user?.name,
		created: moment(a.created).format('YYYY-MM-DD'),
	}));


	const MENU_DATA = [
		{title: 'Edit', icon: DriveFileRenameOutlineIcon, fn: editHandler},
		{title: 'Download', icon: DownloadIcon, fn: downloadHandler},
		{title: 'Delete', icon: DeleteOutlinedIcon, fn: handleDeleteArticle, color: colors.red},
	];

	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<PageHeader header={'Articles'}/>
				{listArticlesToDelete.length > 0 && <Button
					variant={'contained'}
					color={'primary'}
					onClick={groupDeleteHandler}
				>Delete selected</Button>}
			</Box>
			<DataGrid
				disableColumnFilter
				rowSelectionModel={listArticlesToDelete}
				rows={rows}
				columns={columns}
				initialState={{pagination: {paginationModel}}}
				pageSizeOptions={[10, 20]}
				checkboxSelection
				// sx={{marginTop: '3rem'}}
				rowHeight={75}
				disableColumnSelector
				disableRowSelectionOnClick
				onRowSelectionModelChange={(newSelection) => {
					handleSelectionChange(newSelection);
				}}
			/>
			<Drawer
				anchor={'right'}
				open={!!selected}
				onClose={() => setSelected(null)}
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
						padding: '2rem',
						overflow: 'hidden'
					}}
				>
					<Box
						sx={{
							overflow: 'auto', height: '100%',
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
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								paddingRight: '3rem'
							}}
						>
							<Typography
								variant={'h2'}
								sx={{color: colors.mainGreen, flexShrink: 3, flexGrow: 0}}
							>{selected?.title}</Typography>
							{!!selected?.image && <Box
								sx={{
									flexShrink: 0,
									// flexGrow: 2,
									width: '15rem',
									overflow: 'hidden',
									borderRadius: '2rem'
								}}
							>
								<Box
									component={'img'}
									alt={'img'}
									src={selected?.image[0]?.url}
									sx={{width: '100%', height: '100%', objectFit: 'cover',}}
								/>
							</Box>}
						</Box>
						<FormattedTextDisplayArticle>{selected?.content}</FormattedTextDisplayArticle>
					</Box>
				</Box>
			</Drawer>
			<DropMenu
				// disabled={disabled}
				onClose={handleClose}
				open={open}
				data={MENU_DATA}
				anchorEl={anchorEl}
			/>
			{loading && <FullPageLoader/>}
		</Container>
	)
		;
};

export default ArticlesPage;
