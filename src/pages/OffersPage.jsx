import React, {useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {paginationModel} from "../utils/helpers";
import moment from "moment/moment";
import useSWR from "swr";
import PageHeader from "../components/PageHeader";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {colors} from "../assets/styles/colors";
import {toast} from "react-toastify";
import FullPageLoader from "../components/FullPageLoader";
import {useNavigate} from "react-router-dom";
import {deleteOffer, getOffers} from "../services/offers";
import DrawerOfferContentDisplay from "../components/Offers/DrawerOfferContentDisplay";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DropMenu from "../components/DropMenu";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const OffersPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR(`/offers`, () => getOffers());
	const [selected, setSelected] = useState(null);
	const [isConcept, setIsConcept] = useState(false);
	const [listToDelete, setListToDelete] = useState([]);
	const [loading, setLoading] = React.useState(false);
	const [id, setId] = useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event, id) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
		setId(null);
	};

	const open = Boolean(anchorEl);

	const navigate = useNavigate();

	const columns = [
		{field: 'offer', headerName: 'Title', flex: 3},
		{
			flex: 1,
			field: 'concept',
			type: 'actions',
			headerName: 'Concept',
			getActions: (params) => {
				const isActive = params.row?.item["tailored training concept"];
				return [
					<GridActionsCellItem
						icon={<RemoveRedEyeIcon sx={{color: isActive ? colors.orange : colors.silver}}/>}
						label='Action'
						onClick={(event) => {
							if (!isActive) {
								return;
							}
							event.stopPropagation(); // Предотвращаем выделение строки
							const record = data?.find(d => d.id === params.id);
							setIsConcept(true);
							setSelected(record);
						}}
					/>
				];
			},
		}, {
			flex: 1,
			field: 'view',
			type: 'actions',
			headerName: 'Modules',
			getActions: (params) => {
				const isActive = params.row?.item?.ofSteps;

				return [
					<GridActionsCellItem
						icon={<RemoveRedEyeIcon sx={{color: isActive ? colors.orange : colors.silver}}/>}
						label='Action'
						onClick={(event) => {
							if (!isActive) {
								return;
							}
							event.stopPropagation(); // Предотвращаем выделение строки
							const record = data?.find(d => d.id === params.id);
							setIsConcept(false);
							setSelected(record);
						}}
					/>
				];
			},
		},
		{
			field: 'created',
			headerName: 'Created at',
			flex: 1
		},
		{
			field: 'updated',
			headerName: 'Updated at',
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

	const rows = data?.map((a, index) => ({
		id: a.id,
		offer: `${a?.title}`,
		updated: moment(a.updatedAt).format('YYYY-MM-DD'),
		created: moment(a.createdAt).format('YYYY-MM-DD'),
		item: a

	}));

	const handleSelectionChange = (data) => {
		setListToDelete([...data]);
	};

	const groupDeleteHandler = async () => {
		if (!listToDelete?.length) {
			return;
		}
		if (window.confirm("Are you sure you want to delete this Articles?")) {
			setLoading(true);
			try {
				for (const id of listToDelete) {
					await deleteOffer(id);
				}
				await mutate();
				toast.success('Deleted successfully!');
				setListToDelete([]);
				setLoading(false);
			} catch (e) {
				toast.error('Something goes wrong');
				console.log('Article del error: ', e);
			} finally {
				setLoading(false);
			}
		}
	};

	const createHandler = () => navigate('/offers/create');

	const handleDelete = async () => {
		if (!id) {
			return;
		}
		if (window.confirm("Are you sure you want to delete?")) {
			setLoading(true);
			try {
				await deleteOffer(id);
				await mutate();
				toast.success('Deleted successfully!');
				setId(null);
				setAnchorEl(null);
				setLoading(false);
			} catch (e) {
				toast.error('Something goes wrong');
				console.log('Offer del error: ', e);
			} finally {
				setLoading(false);
			}
		}
	};

	const downloadHandler = () => {
	};
	const shortsHandler = () => {
		navigate('/offers/create', {
			state: {
				offerId: id,
			}
		});
	};


	const MENU_DATA = [
		{title: 'Change current Offer', icon: NoteAddIcon, fn: shortsHandler},
		{title: 'Download', icon: DownloadIcon, fn: downloadHandler, disabled: true},
		{title: 'Delete', icon: DeleteOutlinedIcon, fn: handleDelete, color: colors.red},
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
				<PageHeader header={`Offers`}/>
				{listToDelete.length > 0 && <Button
					variant={'contained'}
					color={'primary'}
					onClick={groupDeleteHandler}
				>Delete selected</Button>}
				<Button
					variant={'contained'}
					color={'primary'}
					onClick={createHandler}
				>{`Create Offer`}</Button>
			</Box>
			<DataGrid
				disableColumnFilter
				rowSelectionModel={listToDelete}
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
			{/*</Box>*/}
			<DrawerOfferContentDisplay offer  {...{selected, setSelected, isConcept}} />
			{(loading || isLoading) && <FullPageLoader/>}
			<DropMenu
				// disabled={disabled}
				onClose={handleClose}
				open={open}
				data={MENU_DATA}
				anchorEl={anchorEl}
			/>
		</Container>
	);
};

export default OffersPage;
